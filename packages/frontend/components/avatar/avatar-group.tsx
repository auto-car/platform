import React from "react";
import { UserAvatar } from "./user-avatar";

interface AvatarGroupProps {
  avatars: any[];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {avatars.map((_, index) => (
        <UserAvatar key={index} size='small' isGrouped />
      ))}
    </div>
  );
};
