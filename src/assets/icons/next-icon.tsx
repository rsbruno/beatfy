interface SVGComponentProps {
  width?: string | number;
  height?: string | number;
  strokeWidth?: string;
  stroke?: string;
}

export function NextIcon({ width, height, stroke, strokeWidth }: SVGComponentProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.76001 4.22005V13.7901C0.76001 15.7501 2.89 16.98 4.59 16L8.73999 13.61L12.89 11.21C14.59 10.23 14.59 7.78004 12.89 6.80004L8.73999 4.40004L4.59 2.01006C2.89 1.03006 0.76001 2.25005 0.76001 4.22005Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.24 15.1801V2.82007"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
