import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  name: string;
  size?: "normal" | "small";
  isGrouped?: boolean;
  src?: string | null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size = "normal",
  isGrouped = false,
  src,
}) => {
  const width = size === "normal" ? 36 : 28;
  return (
    <Image
      alt='User'
      src={src || "https://source.unsplash.com/random"}
      width={width}
      height={width}
      style={{
        borderRadius: "50%",
        cursor: "pointer",
        marginLeft: isGrouped ? -12 : 0,
        pointerEvents: "none",
        boxShadow: size === "small" ? "0px 0px 4px black" : "",
      }}
    />
  );
};
