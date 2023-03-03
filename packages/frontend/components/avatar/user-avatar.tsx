import Image from "next/image";
import React from "react";
import styles from "./user-avatar.module.css";

interface UserAvatarProps {
  name: string;
  size?: "normal" | "small" | "tiny";
  isGrouped?: boolean;
  src?: string | null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size = "normal",
  isGrouped = false,
  src,
}) => {
  const width = size === "normal" ? 36 : size === "small" ? 28 : 24;
  return (
    <Image
      alt='User'
      src={src || "https://source.unsplash.com/random"}
      width={width}
      height={width}
      className={styles.avatar}
      style={{
        marginLeft: isGrouped ? -12 : 0,
        boxShadow: size === "small" ? "0px 0px 4px black" : "",
      }}
    />
  );
};
