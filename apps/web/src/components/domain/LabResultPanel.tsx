import type { LabResult } from "@/lib/lab";

export function LabResultPanel({ result }: { result: LabResult }) {
  return (
    <div style={{ display: "grid", gap: "1rem", marginTop: "1.25rem" }} className="lab-surface">
      <section style={panelStyle}>
        <h3 style={hStyle}>结果摘要</h3>
        <p style={{ margin: 0 }}>{result.summary}</p>
      </section>
      <section style={panelStyle}>
        <h3 style={hStyle}>口径说明</h3>
        <p style={{ margin: 0 }}>{result.assumptions}</p>
      </section>
      <section style={panelStyle}>
        <h3 style={hStyle}>DIY 下一步</h3>
        <ol style={{ margin: 0, paddingLeft: "1.1rem" }}>
          {result.diyNext.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      </section>
      <section style={panelStyle}>
        <h3 style={hStyle}>专业介入信号</h3>
        <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
          {result.askAdvisorSignals.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  border: "1px solid var(--color-line)",
  padding: "1rem",
  background: "var(--color-bg-elevated)",
};

const hStyle: React.CSSProperties = {
  margin: "0 0 0.5rem",
  fontSize: "1rem",
  color: "var(--color-brand)",
};
