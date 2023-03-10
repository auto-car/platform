import React from "react";
import { type IconProps } from "./types";

export const DeleteIcon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 9 11'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.642857 9.77778C0.642857 10.45 1.22143 11 1.92857 11H7.07143C7.77857 11 8.35714 10.45 8.35714 9.77778V2.44444H0.642857V9.77778ZM9 0.611111H6.75L6.10714 0H2.89286L2.25 0.611111H0V1.83333H9V0.611111Z'
        fill='inherit'
      />
    </svg>
  );
};
