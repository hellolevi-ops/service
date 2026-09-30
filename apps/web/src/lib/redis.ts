import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

export function getRedis() {
  if (!globalForRedis.redis) {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL is not set");
    }
    globalForRedis.redis = new Redis(url, {
      maxRetriesPerRequest: 2,
      lazyConnect: true,
    });
  }
  return globalForRedis.redis;
}

/** Sliding window: max `limit` requests per `windowSec` for a key. */
export async function rateLimit(
  key: string,
  limit = 5,
  windowSec = 600,
): Promise<{ ok: boolean; remaining: number }> {
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
}
