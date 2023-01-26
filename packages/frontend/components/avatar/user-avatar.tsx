import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  size?: "normal" | "small";
  isGrouped?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size = "normal",
  isGrouped = false,
}) => {
  const width = size === "normal" ? 48 : 36;
  return (
    <div>
      <Image
        alt='User'
        src='https://source.unsplash.com/random'
        width={width}
        height={width}
        style={{
          borderRadius: "50%",
          marginLeft: isGrouped ? -12 : 0,
        }}
      />
    </div>
  );
};
