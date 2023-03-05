import React from "react";
import { type IconProps } from "./types";

export const NextIcon: React.FC<IconProps> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.24 8.56C10.3867 8.41333 10.46 8.22667 10.46 8C10.46 7.77333 10.3867 7.58667 10.24 7.44L7.76 4.96C7.61333 4.81333 7.43013 4.74 7.2104 4.74C6.99067 4.74 6.80053 4.82 6.64 4.98C6.49333 5.12667 6.42 5.31333 6.42 5.54C6.42 5.76667 6.49333 5.95333 6.64 6.1L8.54 8L6.62 9.92C6.47333 10.0667 6.4 10.2499 6.4 10.4696C6.4 10.6893 6.48 10.8795 6.64 11.04C6.78667 11.1867 6.97333 11.26 7.2 11.26C7.42667 11.26 7.61333 11.1867 7.76 11.04L10.24 8.56ZM16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9493 12.0933 14.3795 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7893 9.10667 15.9995 8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9493 3.06 14.3795 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210666 10.1467 0.000533032 9.10667 -3.49691e-07 8C-3.98065e-07 6.89333 0.210133 5.85334 0.6304 4.88C1.05067 3.90667 1.62053 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.629602C5.85333 0.209336 6.89333 -0.000531489 8 1.79608e-06C9.10667 1.7477e-06 10.1467 0.210135 11.12 0.630402C12.0933 1.05067 12.94 1.62053 13.66 2.34C14.38 3.06 14.9501 3.90667 15.3704 4.88C15.7907 5.85333 16.0005 6.89333 16 8Z'
        fill='inherit'
      />
    </svg>
  );
};
