import React from "react";
import { Avatar } from "./avatar";
import styles from "./user-profile-button.module.css";

interface UserProfileButtonProps {
  name: string;
  picture: string;
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  name,
  picture,
}) => {
  return (
    <button className={styles.userProfileButton}>
      <Avatar src={picture} />
      <span className={styles.profileName}>{name}</span>
    </button>
  );
};
