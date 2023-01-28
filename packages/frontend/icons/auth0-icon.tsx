import React from "react";
import { IconProps } from "./types";

export const Auth0Icon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox='0 0 257 285'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M221.412 0H128.997L157.559 89.006H249.975L175.205 142.083L203.775 231.594C251.903 196.534 267.629 143.474 249.983 89.006L221.412 0ZM8.0179 89.006H100.434L128.997 0H36.5889L8.0179 89.006C-9.6371 143.474 6.0989 196.535 54.2259 231.594L82.7889 142.084L8.0179 89.006ZM54.2259 231.594L128.996 284.564L203.766 231.594L128.996 177.747L54.2259 231.594Z' />
    </svg>
  );
};
