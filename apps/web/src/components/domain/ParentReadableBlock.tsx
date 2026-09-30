import Link from "next/link";

export function ParentReadableBlock({
  variant,
  title,
  body,
  href,
  linkLabel,
}: {
  variant: "fee" | "boundary" | "sync" | "combo";
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <aside
      data-variant={variant}
      style={{
        margin: "1.5rem 0",
        padding: "1rem 1.1rem",
        background: "color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-elevated))",
        borderLeft: "3px solid var(--color-accent)",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.8rem", letterSpacing: "0.06em" }}>给家长</p>
      <h3 style={{ margin: "0.35rem 0", fontSize: "1.05rem" }}>{title}</h3>
      <p style={{ margin: 0 }}>{body}</p>
      {href ? (
        <Link href={href} style={{ display: "inline-block", marginTop: "0.65rem" }}>
          {linkLabel || "了解更多"}
        </Link>
      ) : null}
    </aside>
  );
}
