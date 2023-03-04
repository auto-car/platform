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
      viewBox='0 0 19 22'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_375_3294)'>
        <path
          d='M3.44402 0.180194C3.35584 0.233682 3.28595 0.312652 3.24358 0.406679C3.20121 0.500706 3.18835 0.605371 3.2067 0.706859L5.71822 14.6875C5.73574 14.7853 5.78144 14.8758 5.84971 14.948C5.91797 15.0201 6.00582 15.0708 6.10247 15.0937C6.19911 15.1166 6.30035 15.1108 6.39375 15.077C6.48714 15.0432 6.56862 14.9828 6.62819 14.9033L9.80742 10.6786L15.0251 9.814C15.1228 9.79765 15.2137 9.75317 15.2865 9.686C15.3594 9.61883 15.4111 9.53187 15.4354 9.43577C15.4596 9.33968 15.4553 9.2386 15.423 9.1449C15.3907 9.0512 15.3318 8.96895 15.2535 8.9082L4.02073 0.213476C3.93931 0.150508 3.84075 0.113652 3.73799 0.107755C3.63523 0.101858 3.53309 0.127196 3.44501 0.180437L3.44402 0.180194Z'
          fill='inherit'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_375_3294'
          x='0.198486'
          y='0.106934'
          width='18.2524'
          height='21.0005'
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
          <feOffset dy='3' />
          <feGaussianBlur stdDeviation='1.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_375_3294'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_375_3294'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
