import React from "react";
import { Avatar, type AvatarProps } from "./avatar";
import styles from "./avatar.module.css";

interface AvatarGroupProps {
  avatars: AvatarProps[];
  showText?: boolean;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  showText = true,
}) => {
  return (
    <div className={styles.avatarGroupContainer}>
      <div className={styles.avatarGroup}>
        {avatars.slice(0, 3).map((avatar, key) => (
          <div className={styles.avatarGroupItem} key={key}>
            <Avatar
              {...avatar}
              size='small'
              appearance={key === 2 ? "dim" : "normal"}
            />
            {key === 2 && avatars.length > 3 ? (
              <span className={styles.avatarGroupNumber}>
                +{avatars.length - 2}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {showText ? (
        <p className={styles.avatarGroupUsersText}>
          Fabio, Raymond and {avatars.length - 2} others
        </p>
      ) : null}
    </div>
  );
};
