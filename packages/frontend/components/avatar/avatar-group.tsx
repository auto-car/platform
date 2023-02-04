import { RoomMember } from "@platform/model";
import React from "react";
import { UserAvatar } from "./user-avatar";

interface AvatarGroupProps {
  avatars: RoomMember[];
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
      {avatars.map((avatar) => (
        <UserAvatar
          key={avatar.id}
          size='small'
          isGrouped
          name={avatar.name}
          src={avatar.picture}
        />
      ))}
    </div>
  );
};
