import React from "react";
import { RoomMember } from "@platform/model";
import { UserAvatar } from "./user-avatar";
import styles from "./avatar-group.module.css";

interface AvatarGroupProps {
  avatars: RoomMember[];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  return (
    <div className={styles.avatarGroup}>
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
