import React from "react";
import Image from "next/image";

export const Cursor = ({
  x,
  y,
  user,
  userColour,
}: {
  x: number;
  y: number;
  user: string;
  userColour: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        position: "absolute",
        left: 0,
        top: 0,
        transition: "transform 120ms linear",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <Image src='/cursor.svg' alt='cursor' width={36} height={36} />
      <div
        style={{
          borderRadius: "24px",
          background: `var(--${userColour}-200)`,
          color: `var(--${userColour}-500)`,
          padding: "8px 12px",
        }}
      >
        <p style={{ fontWeight: 500 }}>{user}</p>
      </div>
    </div>
  );
};
