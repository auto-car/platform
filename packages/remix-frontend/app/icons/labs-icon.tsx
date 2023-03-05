import React from "react";
import { type IconProps } from "./types";

export const LabsIcon: React.FC<IconProps> = ({ width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 35 51'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.5 51C14.0417 51 11.0933 49.7565 8.655 47.2694C6.21667 44.7823 4.99834 41.7758 5 38.25V15.3C3.625 15.3 2.4475 14.8002 1.4675 13.8006C0.487504 12.801 -0.00166242 11.6008 4.24448e-06 10.2V5.1C4.24448e-06 3.6975 0.490004 2.49645 1.47 1.49685C2.45 0.497254 3.62667 -0.00169567 5 4.32937e-06H30C31.375 4.32937e-06 32.5525 0.499804 33.5325 1.4994C34.5125 2.499 35.0017 3.6992 35 5.1V10.2C35 11.6025 34.51 12.8036 33.53 13.8032C32.55 14.8028 31.3733 15.3017 30 15.3V38.25C30 41.7775 28.7808 44.7848 26.3425 47.2719C23.9042 49.759 20.9567 51.0017 17.5 51ZM17.5 45.9C19.125 45.9 20.5833 45.4215 21.875 44.4644C23.1667 43.5073 24.0625 42.2858 24.5625 40.8H17.5V35.7H25V33.15H17.5V28.05H25V25.5H17.5V20.4H25V15.3H10V38.25C10 40.375 10.7292 42.1813 12.1875 43.6687C13.6458 45.1562 15.4167 45.9 17.5 45.9Z'
        fill='inherit'
      />
    </svg>
  );
};