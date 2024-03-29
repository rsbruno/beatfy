interface SVGComponentProps {
  width?: string | number;
  height?: string | number;
  strokeWidth?: string;
  stroke?: string;
}

export function PlayIcon({ width, height, stroke, strokeWidth }: SVGComponentProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 9.9999V6.43989C1 2.01989 4.13 0.209895 7.96 2.4199L11.05 4.1999L14.14 5.9799C17.97 8.1899 17.97 11.8099 14.14 14.0199L11.05 15.7999L7.96 17.5799C4.13 19.7899 1 17.9799 1 13.5599V9.9999Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
