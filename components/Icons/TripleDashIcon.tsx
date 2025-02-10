import React from 'react';

interface ThreeDashesIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number | string;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
}

export default function ThreeDashesIcon({
  width = 10,
  height = 30,
  color = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  ...props
}: ThreeDashesIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      {...props}
    >
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </svg>
  );
}
