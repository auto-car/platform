import React from "react";
import { type IconProps } from "./types";

export const CursorIcon: React.FC<IconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 24'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_375_3293)'>
        <path
          d='M4.44402 2.18019C4.35584 2.23368 4.28595 2.31265 4.24358 2.40668C4.20121 2.50071 4.18835 2.60537 4.2067 2.70686L6.71822 16.6875C6.73574 16.7853 6.78144 16.8758 6.84971 16.948C6.91797 17.0201 7.00582 17.0708 7.10247 17.0937C7.19911 17.1166 7.30035 17.1108 7.39375 17.077C7.48714 17.0432 7.56862 16.9828 7.62819 16.9033L10.8074 12.6786L16.0251 11.814C16.1228 11.7977 16.2137 11.7532 16.2865 11.686C16.3594 11.6188 16.4111 11.5319 16.4354 11.4358C16.4596 11.3397 16.4553 11.2386 16.423 11.1449C16.3907 11.0512 16.3318 10.9689 16.2535 10.9082L5.02073 2.21348C4.93931 2.15051 4.84075 2.11365 4.73799 2.10776C4.63523 2.10186 4.53309 2.1272 4.44501 2.18044L4.44402 2.18019Z'
          fill='inherit'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_375_3293'
          x='0.198486'
          y='0.106934'
          width='20.2524'
          height='23.0005'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_375_3293'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_375_3293'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
