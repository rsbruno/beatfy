interface SVGComponentProps {
  width?: string | number;
  height?: string | number;
  primaryElement?: {
    fill?: string;
    strokeWidth?: string;
    stroke?: string;
  };
  secondaryElement?: {
    fill?: string;
    strokeWidth?: string;
    stroke?: string;
  };
}

export function HomeIcon({ width, height, primaryElement, secondaryElement }: SVGComponentProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.02 4.83992L3.63 9.03992C2.73 9.73992 2 11.2299 2 12.3599V19.7699C2 22.0899 3.89 23.9899 6.21 23.9899H17.79C20.11 23.9899 22 22.0899 22 19.7799V12.4999C22 11.2899 21.19 9.73992 20.2 9.04992L14.02 4.71992C12.62 3.73992 10.37 3.78992 9.02 4.83992Z"
        fill={secondaryElement?.fill}
      />
      <path
        d="M11.02 2.83992L5.63 7.03992C4.73 7.73992 4 9.22992 4 10.3599V17.7699C4 20.0899 5.89 21.9899 8.21 21.9899H19.79C22.11 21.9899 24 20.0899 24 17.7799V10.4999C24 9.28992 23.19 7.73992 22.2 7.04992L16.02 2.71992C14.62 1.73992 12.37 1.78992 11.02 2.83992Z"
        stroke={primaryElement?.stroke}
        strokeWidth={primaryElement?.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17.99V14.99"
        stroke={primaryElement?.stroke}
        strokeWidth={primaryElement?.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
