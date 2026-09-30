export function DisclaimerInline() {
  return (
    <p
      className="muted"
      style={{
        fontSize: "0.9rem",
        borderLeft: "2px solid var(--color-line)",
        paddingLeft: "0.75rem",
      }}
    >
      个案不代表概率；结果标签仅描述该样本路径，不可外推为成功率。
    </p>
  );
}
