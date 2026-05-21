import React from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number | string;
  height?: number;
  strokeWidth?: number;
}

export function Sparkline({ data, color, width = '100%', height = 40, strokeWidth = 2 }: SparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  // Normalize points to fit within the SVG viewBox
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  // Clean the hex color to use as a valid SVG ID
  const gradientId = `gradient-${color.replace('#', '')}`;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 -10 100 120" 
      preserveAspectRatio="none"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <polygon
        fill={`url(#${gradientId})`}
        points={`0,100 ${points} 100,100`}
      />
    </svg>
  );
}

