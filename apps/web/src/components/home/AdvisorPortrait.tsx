import Image from "next/image";

type Props = { name: string; photo?: string; compact?: boolean };

/** 顾问头像：有真实照片时铺满画框；暂无照片时显示统一的人像剪影，上线前替换为实拍照片。 */
export function AdvisorPortrait({ name, photo, compact = false }: Props) {
  if (photo) {
    return <Image src={photo} alt={`${name} 肖像`} fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover" />;
  }
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #E9F0EE 0%, #D5E2DE 100%)" }}
      role="img"
      aria-label={`${name} 照片待补`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 350" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="140" cy="128" r="50" fill="var(--brand)" fillOpacity="0.32" />
        <path d="M30 350 C 30 262 82 214 140 214 S 250 262 250 350Z" fill="var(--brand)" fillOpacity="0.32" />
      </svg>
      {compact ? null : <span className="absolute bottom-3 left-0 right-0 text-center text-xs text-[var(--ink-2)]">照片待补</span>}
    </div>
  );
}
