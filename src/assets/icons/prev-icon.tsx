interface SVGComponentProps {
  width?: string | number;
  height?: string | number;
  strokeWidth?: string;
  stroke?: string;
}

export function PrevIcon({ width, height, stroke, strokeWidth }: SVGComponentProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.24 4.22005V13.7901C17.24 15.7501 15.11 16.98 13.41 16L9.25999 13.61L5.10996 11.21C3.40996 10.23 3.40996 7.78004 5.10996 6.80004L9.25999 4.40004L13.41 2.01006C15.11 1.03006 17.24 2.25005 17.24 4.22005Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.76001 15.1801V2.82007"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
