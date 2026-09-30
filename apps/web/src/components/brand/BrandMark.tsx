import Link from "next/link";
import { SITE } from "@/lib/site";

type BrandMarkProps = {
  variant?: "light" | "dark";
  size?: number;
  className?: string;
  withWordmark?: boolean;
  href?: string | null;
};

export function BrandMark({
  variant = "light",
  size = 32,
  className = "",
  withWordmark = false,
  href = "/",
}: BrandMarkProps) {
  const brandColor = variant === "dark" ? "text-[#7FD1C6]" : "text-[var(--brand)]";
  const titleColor = variant === "dark" ? "text-white" : "text-[var(--ink)]";

  const inner = (
    <span
      className={"inline-flex items-center gap-2.5 group select-none shrink-0 " + className}
    >
      {/* Elegant Ivy Vine vector mark */}
      <svg
        style={{ width: size, height: size }}
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={`shrink-0 block ${brandColor}`}
      >
        <path
          d="M8 28C8 18 14 12 23 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M23 8C28 8 30 12 29 17C24 17 21 13 23 8Z" fill="currentColor" />
        <path d="M12 20C8 18 6.5 14 7.5 10C11.5 11 13.5 15.5 12 20Z" fill="currentColor" />
      </svg>

      {withWordmark ? (
        <span
          className={`text-xl sm:text-2xl font-bold tracking-wide font-serif leading-none ${titleColor}`}
        >
          {SITE.brand}
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="inline-flex items-center text-decoration-none" aria-label={SITE.brand}>
      {inner}
    </Link>
  );
}
