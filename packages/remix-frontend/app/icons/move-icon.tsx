import React from "react";
import { type IconProps } from "./types";

export const MoveIcon: React.FC<IconProps> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 17 18'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.99979 6.49997L1.99579 9.17197C1.7158 9.54524 1.57513 10.0047 1.59814 10.4707C1.62115 10.9368 1.80639 11.3801 2.12179 11.724L5.90579 15.852C6.28379 16.265 6.81779 16.5 7.37879 16.5H11.9998C14.3998 16.5 15.9998 15 15.9998 12.5V3.92897C15.9998 1.64297 12.9998 1.64297 12.9998 3.92897V4.49997L13 3.027C13 0.740996 10 0.740996 10 3.027M10 3.027V4.5V2.5M10 3.027V2.5M10 2.5C10 0.213996 7 0.213988 7 2.49999V4.49999V2.38399C7 1.55499 6.328 0.999988 5.5 0.999988C5.10218 0.999988 4.72064 1.15802 4.43934 1.43933C4.15804 1.72063 4 2.10216 4 2.49999V9.49999'
        fill='none'
        stroke='inherit'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
