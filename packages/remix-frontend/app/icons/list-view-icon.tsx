import React from "react";
import { type IconProps } from "./types";

export const ListViewIcon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 12'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M8 12C7.44772 12 7 11.5523 7 11V11C7 10.4477 7.44772 10 8 10H10C10.5523 10 11 10.4477 11 11V11C11 11.5523 10.5523 12 10 12H8ZM4 7C3.44772 7 3 6.55228 3 6V6C3 5.44772 3.44772 5 4 5H14C14.5523 5 15 5.44772 15 6V6C15 6.55228 14.5523 7 14 7H4ZM1 2C0.447716 2 0 1.55228 0 1V1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1V1C18 1.55228 17.5523 2 17 2H1Z'
        fill='inherit'
      />
    </svg>
  );
};
