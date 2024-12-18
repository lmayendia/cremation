import React from 'react';

export const Stain: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        d="M50 50C30 70 70 110 100 90C130 70 170 90 160 50C150 10 100 20 80 40C60 60 70 30 50 50Z"
        fill="#ff7400"
      >
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
            M50 50C30 70 70 110 100 90C130 70 170 90 160 50C150 10 100 20 80 40C60 60 70 30 50 50Z;
            M60 60C40 80 80 100 110 80C140 60 180 80 150 40C120 0 90 40 70 50C50 70 80 40 60 60Z;
            M50 50C30 70 70 110 100 90C130 70 170 90 160 50C150 10 100 20 80 40C60 60 70 30 50 50Z
          "
        />
      </path>
    </svg>
  );
};
