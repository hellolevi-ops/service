import Redis from "ioredis";

// MOCKED — in-memory fallback, data lost on container sleep
const memoryStore = new Map<string, { value: number; expireAt: number }>();
const rawStore = new Map<string, any>();

export const mockRedis = {
  status: "ready",
  connect: async () => undefined,
  get: async (k: string) => rawStore.get(k) ?? null,
  set: async (k: string, v: any) => {
    rawStore.set(k, v);
    return "OK";
  },
  del: async (k: string) => {
    rawStore.delete(k);
    return 1;
  },
  incr: async (k: string) => {
    const n = Number(rawStore.get(k) || 0) + 1;
    rawStore.set(k, n);
    return n;
  },
  expire: async () => 1,
  ping: async () => "PONG",
} as unknown as Redis;

const globalForRedis = globalThis as unknown as { redis?: Redis };

export function getRedis(): Redis {
  if (globalForRedis.redis) {
    return globalForRedis.redis;
  }
  const url = process.env.REDIS_URL?.trim();
  if (!url) {
    return mockRedis;
  }
  try {
    globalForRedis.redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
    });
    return globalForRedis.redis;
  } catch {
    return mockRedis;
  }
}

/** Sliding window: max `limit` requests per `windowSec` for a key. */
export async function rateLimit(
  key: string,
  limit = 5,
  windowSec = 600,
): Promise<{ ok: boolean; remaining: number }> {
  if (process.env.REDIS_URL?.trim()) {
    try {
      const redis = getRedis();
      if (redis.status !== "ready") {
        await redis.connect().catch(() => undefined);
      }
      const redisKey = `rl:leads:${key}`;
      const count = await redis.incr(redisKey);
      if (count === 1) {
        await redis.expire(redisKey, windowSec);
      }
      return { ok: count <= limit, remaining: Math.max(0, limit - count) };
    } catch {
      // Fall through to memoryStore
    }
  }

  const now = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || entry.expireAt <= now) {
    memoryStore.set(key, { value: 1, expireAt: now + windowSec * 1000 });
    return { ok: true, remaining: limit - 1 };
  }
  entry.value += 1;
  return { ok: entry.value <= limit, remaining: Math.max(0, limit - entry.value) };
}
