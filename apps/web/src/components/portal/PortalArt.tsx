import type { ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  Calculator,
  CalendarClock,
  ClipboardCheck,
  MessagesSquare,
  PenLine,
  Target,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 国旗（圆形）                                                         */
/* ------------------------------------------------------------------ */
export type FlagCode = "us" | "uk" | "hk" | "sg" | "au" | "ca" | "jp" | "de" | "fr";

export function Flag({ code, size = 28 }: { code: FlagCode; size?: number }) {
  const id = `flag-${code}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0 rounded-full">
      <defs>
        <clipPath id={id}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {code === "us" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} y={i * 4.57} width="32" height="2.28" fill="#D6342C" />
            ))}
            <rect width="15" height="17.5" fill="#2B3F8F" />
            {[3, 7.5, 12].map((x) =>
              [3, 7.5, 12, 16].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y - 0.5} r="0.9" fill="#fff" />),
            )}
          </>
        )}
        {code === "uk" && (
          <>
            <rect width="32" height="32" fill="#2B3F8F" />
            <path d="M0 0L32 32M32 0L0 32" stroke="#fff" strokeWidth="6" />
            <path d="M0 0L32 32M32 0L0 32" stroke="#D6342C" strokeWidth="2" />
            <path d="M16 0V32M0 16H32" stroke="#fff" strokeWidth="9" />
            <path d="M16 0V32M0 16H32" stroke="#D6342C" strokeWidth="5" />
          </>
        )}
        {code === "hk" && (
          <>
            <rect width="32" height="32" fill="#D6342C" />
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="16" cy="10.5" rx="2.6" ry="5" fill="#fff" transform={`rotate(${r} 16 16)`} />
            ))}
          </>
        )}
        {code === "sg" && (
          <>
            <rect width="32" height="16" fill="#D6342C" />
            <rect y="16" width="32" height="16" fill="#fff" />
            <circle cx="9" cy="8" r="4.6" fill="#fff" />
            <circle cx="10.8" cy="8" r="4.2" fill="#D6342C" />
            {[[14.5, 4.5], [18.5, 7.5], [17.2, 12], [12.2, 12], [11, 7.2]].map(([x, y], i) => (
              <circle key={i} cx={x + 2} cy={y} r="1" fill="#fff" />
            ))}
          </>
        )}
        {code === "au" && (
          <>
            <rect width="32" height="32" fill="#1F3A8A" />
            <path d="M0 0H15V15H0Z" fill="#2B3F8F" />
            <path d="M0 0L15 15M15 0L0 15" stroke="#fff" strokeWidth="2.6" />
            <path d="M7.5 0V15M0 7.5H15" stroke="#fff" strokeWidth="4" />
            <path d="M7.5 0V15M0 7.5H15" stroke="#D6342C" strokeWidth="2" />
            <circle cx="8" cy="24" r="2.6" fill="#fff" />
            {[[22, 8], [26, 14], [22, 20], [18, 14], [24, 26]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.3" fill="#fff" />
            ))}
          </>
        )}
        {code === "ca" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            <rect width="8" height="32" fill="#D6342C" />
            <rect x="24" width="8" height="32" fill="#D6342C" />
            <path d="M16 6l2 4 3-1-1 5 3-1.5-1 3 4 .5-5 4.5 1 3-4-1V27h-2v-5l-4 1 1-3-5-4.5 4-.5-1-3 3 1.5-1-5 3 1z" fill="#D6342C" />
          </>
        )}
        {code === "jp" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            <circle cx="16" cy="16" r="7" fill="#D6342C" />
          </>
        )}
        {code === "de" && (
          <>
            <rect width="32" height="11" fill="#222" />
            <rect y="10.6" width="32" height="11" fill="#D6342C" />
            <rect y="21.3" width="32" height="11" fill="#F2B632" />
          </>
        )}
        {code === "fr" && (
          <>
            <rect width="11" height="32" fill="#2B3F8F" />
            <rect x="10.6" width="11" height="32" fill="#fff" />
            <rect x="21.3" width="11" height="32" fill="#D6342C" />
          </>
        )}
      </g>
      <circle cx="16" cy="16" r="15.6" fill="none" stroke="rgba(0,0,0,.12)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 渐变图标方块                                                         */
/* ------------------------------------------------------------------ */
export type TileTone = "teal" | "sky" | "amber" | "coral" | "violet";

const TONES: Record<TileTone, [string, string, string]> = {
  teal: ["#3CD0B8", "#0A8275", "#D9F5EF"],
  sky: ["#63B3FF", "#2468D8", "#DCEBFF"],
  amber: ["#FFC766", "#F2780C", "#FFEBCF"],
  coral: ["#FF9C86", "#E0493B", "#FFE2DC"],
  violet: ["#B2A4FF", "#6A4FDB", "#E9E4FF"],
};

export function IconTile({
  icon: Icon,
  tone = "teal",
  size = 56,
}: {
  icon: LucideIcon;
  tone?: TileTone;
  size?: number;
}) {
  const [a, b, soft] = TONES[tone];
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size >= 48 ? 8 : 6,
        background: `linear-gradient(145deg, ${a}, ${b})`,
        boxShadow: `0 8px 16px -8px ${b}, inset 0 1px 0 rgba(255,255,255,.45)`,
      }}
    >
      <span
        className="absolute rounded-full"
        style={{ width: size * 0.62, height: size * 0.62, right: -size * 0.12, top: -size * 0.14, background: soft, opacity: 0.28 }}
      />
      <Icon className="relative text-white" style={{ width: size * 0.48, height: size * 0.48 }} strokeWidth={2} />
    </span>
  );
}

export const TOOL_ICONS = { ClipboardCheck, Calculator, CalendarClock, Target, BookOpen, BarChart3, PenLine, MessagesSquare };

/* ------------------------------------------------------------------ */
/* 主视觉插画                                                           */
/* ------------------------------------------------------------------ */
function Cloud({ x, y, s = 1, o = 0.85 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx="40" cy="26" rx="40" ry="14" fill="#fff" />
      <ellipse cx="28" cy="18" rx="20" ry="14" fill="#fff" />
      <ellipse cx="54" cy="14" rx="22" ry="15" fill="#fff" />
    </g>
  );
}

function Plane({ x, y, r = -18 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 10L56 0 24 30 18 16Z" fill="#fff" />
      <path d="M18 16L56 0 26 22Z" fill="#CFE3EE" />
      <path d="M-2 12C-40 22-70 10-110 30" stroke="#fff" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function HeroArt({ variant }: { variant: "diagnosis" | "uk" | "ivy" }) {
  return (
    <svg viewBox="0 0 460 340" className="h-full w-full" role="img" aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      <Cloud x={20} y={40} s={1.1} />
      <Cloud x={300} y={16} s={0.8} o={0.7} />
      <Cloud x={340} y={150} s={0.7} o={0.6} />
      {variant === "diagnosis" && (
        <g>
          <ellipse cx="240" cy="310" rx="170" ry="16" fill="#0A5F56" opacity=".18" />
          {/* 书本 */}
          <path d="M80 268C130 250 190 256 240 276 290 256 350 250 400 268V300C350 284 290 290 240 308 190 290 130 284 80 300Z" fill="#fff" />
          <path d="M240 276V308" stroke="#BBD6D0" strokeWidth="3" />
          <path d="M96 276C136 264 188 270 232 286M96 286C136 274 188 280 232 296M248 286C292 270 344 264 384 276M248 296C292 280 344 274 384 286" stroke="#D3E6E2" strokeWidth="3" fill="none" />
          {/* 学位帽 */}
          <path d="M240 130L352 178 240 226 128 178Z" fill="#0A3E39" />
          <path d="M172 200V238C172 258 306 258 306 238V200L240 226Z" fill="#0F5A52" />
          <path d="M352 178V236" stroke="#FFB347" strokeWidth="5" strokeLinecap="round" />
          <circle cx="352" cy="242" r="9" fill="#FFB347" />
          <path d="M240 130L352 178 240 226 128 178Z" fill="none" stroke="#19B8A2" strokeWidth="3" />
          {/* 悬浮卡片 */}
          <g transform="translate(40 96) rotate(-6)">
            <rect width="104" height="56" rx="5" fill="#fff" />
            <circle cx="26" cy="28" r="12" fill="#D9F5EF" />
            <path d="M20 28l5 5 9-10" stroke="#0A8275" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="46" y="18" width="46" height="8" rx="4" fill="#0A3E39" opacity=".85" />
            <rect x="46" y="32" width="34" height="7" rx="3.5" fill="#9BBDB7" />
          </g>
          <g transform="translate(336 70) rotate(5)">
            <rect width="96" height="52" rx="5" fill="#FF8A1F" />
            <text x="48" y="25" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff">30 分钟</text>
            <text x="48" y="42" textAnchor="middle" fontSize="11" fill="#fff" opacity=".92">免费初诊</text>
          </g>
          <Plane x={190} y={70} />
        </g>
      )}
      {variant === "uk" && (
        <g>
          <ellipse cx="240" cy="312" rx="190" ry="14" fill="#0A5F56" opacity=".18" />
          <rect x="70" y="190" width="340" height="118" fill="#F6EFE4" />
          <path d="M60 192L240 110 420 192Z" fill="#E1D5C0" />
          <path d="M96 192L240 128 384 192Z" fill="#EFE6D6" />
          <circle cx="240" cy="160" r="15" fill="#fff" stroke="#C9B899" strokeWidth="3" />
          <path d="M240 151V160L247 164" stroke="#8C7A57" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {[96, 146, 196, 246, 296, 346].map((x) => (
            <g key={x}>
              <rect x={x} y="204" width="22" height="96" rx="3" fill="#FFFDF8" />
              <rect x={x + 4} y="204" width="3" height="96" fill="#E6DCCB" />
            </g>
          ))}
          <rect x="60" y="300" width="360" height="12" fill="#CDBF9F" />
          <rect x="190" y="236" width="100" height="64" rx="50" fill="#8C6A4A" />
          <rect x="204" y="250" width="72" height="50" rx="36" fill="#5A4130" />
          <path d="M330 306c0-30 18-44 34-44s34 14 34 44Z" fill="#19B8A2" opacity=".9" />
          <circle cx="92" cy="284" r="26" fill="#19B8A2" opacity=".75" />
          <rect x="86" y="284" width="12" height="26" fill="#0A6B60" />
          <Plane x={290} y={58} />
          <g transform="translate(336 120) rotate(4)">
            <rect width="104" height="54" rx="5" fill="#fff" />
            <text x="52" y="24" textAnchor="middle" fontSize="11" fill="#6B8783">英国罗素盟校</text>
            <text x="52" y="43" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0A3E39">List 研判</text>
          </g>
        </g>
      )}
      {variant === "ivy" && (
        <g>
          <ellipse cx="240" cy="312" rx="190" ry="14" fill="#0A5F56" opacity=".18" />
          <rect x="60" y="190" width="350" height="118" fill="#B5503C" />
          <rect x="60" y="190" width="350" height="10" fill="#8E3B2B" />
          <path d="M60 190L86 160H384L410 190Z" fill="#8E3B2B" />
          <rect x="212" y="110" width="46" height="84" fill="#C9634D" />
          <path d="M206 110L235 76 264 110Z" fill="#6E2C20" />
          <rect x="230" y="60" width="10" height="20" fill="#6E2C20" />
          {[82, 122, 162, 282, 322, 362].map((x) => (
            <g key={x}>
              <rect x={x} y="214" width="22" height="34" rx="2" fill="#FBE9D8" />
              <rect x={x} y="262" width="22" height="34" rx="2" fill="#FBE9D8" />
            </g>
          ))}
          <rect x="216" y="236" width="38" height="72" rx="3" fill="#FBE9D8" />
          <rect x="223" y="244" width="24" height="64" rx="2" fill="#7A4B36" />
          <circle cx="40" cy="262" r="32" fill="#19B8A2" opacity=".85" />
          <circle cx="424" cy="270" r="26" fill="#19B8A2" opacity=".7" />
          <circle cx="424" cy="236" r="20" fill="#0A8275" opacity=".8" />
          <rect x="36" y="280" width="8" height="30" fill="#0A6B60" />
          <g transform="translate(300 40) rotate(4)">
            <rect width="110" height="76" rx="5" fill="#fff" />
            <rect width="110" height="24" rx="5" fill="#FF8A1F" />
            <rect y="12" width="110" height="12" fill="#FF8A1F" />
            <text x="55" y="17" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ED / EA 早申</text>
            <text x="55" y="58" textAnchor="middle" fontSize="28" fontWeight="700" fill="#0A3E39">11.01</text>
          </g>
          <Plane x={120} y={58} />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 海报底纹                                                             */
/* ------------------------------------------------------------------ */
export type PosterTone = "teal" | "sky" | "amber" | "deep";

const POSTER: Record<PosterTone, { bg: string; ring: string }> = {
  teal: { bg: "linear-gradient(150deg,#1FC4AB 0%,#0A8275 100%)", ring: "rgba(255,255,255,.22)" },
  sky: { bg: "linear-gradient(150deg,#4FA3F7 0%,#2259CC 100%)", ring: "rgba(255,255,255,.22)" },
  amber: { bg: "linear-gradient(150deg,#FFB24D 0%,#F0640B 100%)", ring: "rgba(255,255,255,.26)" },
  deep: { bg: "linear-gradient(150deg,#14685F 0%,#062F2B 100%)", ring: "rgba(255,255,255,.14)" },
};

export function Poster({
  tone,
  className = "",
  children,
}: {
  tone: PosterTone;
  className?: string;
  children: ReactNode;
}) {
  const p = POSTER[tone];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: p.bg }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 240" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <circle cx="350" cy="40" r="110" fill={p.ring} />
        <circle cx="390" cy="210" r="80" fill={p.ring} />
        <circle cx="300" cy="120" r="34" fill="none" stroke={p.ring} strokeWidth="6" />
        <path d="M0 230C90 190 170 250 260 214" stroke={p.ring} strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <div className="relative h-full">{children}</div>
    </div>
  );
}
