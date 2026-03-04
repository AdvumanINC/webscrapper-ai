import React from 'react';

function SeverityBadge({ severity }) {
  const colors = {
    critical: { bg: "#ff3b3015", border: "#ff3b30", text: "#ff6b6b" },
    high: { bg: "#ff950015", border: "#ff9500", text: "#ffb347" },
    medium: { bg: "#ffc70015", border: "#ffc700", text: "#ffd84d" },
    low: { bg: "#00d08415", border: "#00d084", text: "#4ddbaa" },
  };
  const c = colors[severity] || colors.medium;
  return (
    <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "4px", fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", color: c.text, background: c.bg, border: `1px solid ${c.border}40`, boxShadow: `0 0 8px ${c.border}15` }}>
      {severity}
    </span>
  );
}

export default SeverityBadge;
