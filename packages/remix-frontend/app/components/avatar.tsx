import React from "react";
import styles from "./avatar.module.css";

export interface AvatarProps {
  src: string;
  size?: "small" | "normal";
  appearance?: "dim" | "normal";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "normal",
  appearance = "normal",
}) => {
  return (
    <div
      className={`${size === "small" ? styles.avatarSmall : styles.avatar} ${
        appearance === "dim" ? styles.avatarDim : ""
      }`}
    >
      <img
        src={src}
        alt=''
        className={size === "small" ? styles.avatarSmall : styles.avatar}
      />
    </div>
  );
};
