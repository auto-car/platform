import React from "react";
import Image from "next/image";
import styles from "./cursor.module.css";

interface CursorProps {
  x: number;
  y: number;
  user: string;
  userColour: string;
}

export const Cursor: React.FC<CursorProps> = ({ x, y, user, userColour }) => {
  return (
    <div
      className={styles.cursor}
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <Image src='/cursor.svg' alt='cursor' width={36} height={36} />
      <div
        className={styles.cursorLozenge}
        style={{
          background: `var(--${userColour}-200)`,
          color: `var(--${userColour}-500)`,
        }}
      >
        <p className={styles.lozengeText}>{user}</p>
      </div>
    </div>
  );
};
