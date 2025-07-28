import React from "react";

interface TraceVieweProps {
  traces: string[];
}

const TraceViewe: React.FC<TraceVieweProps> = ({ traces }) => (
  <div style={{ background: "#f5f5f5", padding: "10px", marginTop: "10px" }}>
    {traces.map((t, i) => (
      <div key={i}>{t}</div>
    ))}
  </div>
);

export default TraceViewe;
