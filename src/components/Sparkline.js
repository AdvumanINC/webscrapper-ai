import React from 'react';

function Sparkline({ data, color, width = 120, height = 32 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (typeof width === 'string' ? 240 : width);
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={typeof width === 'string' ? '100%' : width} height={height} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <polyline points={points + ` ${(typeof width === 'string' ? 240 : width)},${height} 0,${height}`} fill={`url(#gradient-${color})`} opacity="0.3" />
    </svg>
  );
}

export default Sparkline;
