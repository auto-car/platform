import React from "react";
import { type IconProps } from "./types";

export const ZoomOutIcon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 4'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.7143 3.71434H22.2857C22.7404 3.71434 23.1764 3.53373 23.4979 3.21224C23.8194 2.89074 24 2.45471 24 2.00005C24 1.5454 23.8194 1.10936 23.4979 0.787869C23.1764 0.466379 22.7404 0.285767 22.2857 0.285767H13.7143H10.2857H1.71429C1.25963 0.285767 0.823594 0.466379 0.502103 0.787869C0.180612 1.10936 0 1.5454 0 2.00005C0 2.45471 0.180612 2.89074 0.502103 3.21224C0.823594 3.53373 1.25963 3.71434 1.71429 3.71434H10.2857H13.7143Z'
        fill='inherit'
      />
    </svg>
  );
};
