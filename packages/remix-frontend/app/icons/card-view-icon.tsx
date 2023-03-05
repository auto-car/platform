import React from "react";
import { type IconProps } from "./types";

export const CardViewIcon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 12'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2 0C0.895508 0 0 0.895432 0 2V10C0 11.1046 0.895508 12 2 12H16C17.1045 12 18 11.1046 18 10V2C18 0.895432 17.1045 0 16 0H2ZM3 3C2.44775 3 2 3.44772 2 4C2 4.55228 2.44775 5 3 5H8C8.55225 5 9 4.55228 9 4C9 3.44772 8.55225 3 8 3H3ZM2 5.75C2 5.61193 2.11182 5.5 2.25 5.5H6.75C6.88818 5.5 7 5.61193 7 5.75C7 5.88807 6.88818 6 6.75 6H2.25C2.11182 6 2 5.88807 2 5.75ZM2.5 7.5C2.22363 7.5 2 7.72385 2 8C2 8.27615 2.22363 8.5 2.5 8.5H12.5C12.7764 8.5 13 8.27615 13 8C13 7.72385 12.7764 7.5 12.5 7.5H2.5Z'
        fill='inherit'
      />
    </svg>
  );
};
