export function ProcessTimeline({
  steps,
}: {
  steps: { title: string; detail: string; deliverable: string; duration: string }[];
}) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          style={{
            display: "grid",
            gridTemplateColumns: "2.5rem 1fr",
            gap: "0.75rem",
            borderBottom: "1px solid var(--color-line)",
            paddingBottom: "1rem",
          }}
        >
          <span
            className="display"
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "999px",
              border: "1px solid var(--color-brand)",
              display: "grid",
              placeItems: "center",
              color: "var(--color-brand)",
            }}
          >
            {i + 1}
          </span>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{step.title}</h3>
            <p style={{ margin: "0.35rem 0" }}>{step.detail}</p>
            <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
              交付物：{step.deliverable} · 耗时量级：{step.duration}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
