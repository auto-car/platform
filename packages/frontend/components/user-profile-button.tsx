import React from "react";
import { LogoutIcon } from "icons/logout-icon";
import { useRouter } from "next/router";
import { UserAvatar } from "./avatar/user-avatar";
import styles from "./user-profile-button.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export const UserProfileButton = () => {
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const { user } = useUser();

  const name = React.useMemo(() => {
    const userName = user?.name;
    if (userName) {
      if (userName.includes(" ")) {
        return userName.split(" ")[0];
      } else {
        return userName;
      }
    }
    return "";
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        position: "fixed",
        right: "48px",
        top: "48px",
        cursor: "pointer",
      }}
      onClick={() => setShowProfileActions((prev) => !prev)}
    >
      <div
        style={{
          borderRadius: "50%",
          border: "2px solid var(--violet-300)",
          width: 36,
          height: 36,
        }}
      >
        <UserAvatar src={user?.picture} />
        {showProfileActions ? <UserProfileButtonMenu /> : null}
      </div>
      <p style={{ color: "var(--violet-100)", pointerEvents: "none" }}>
        {name}
      </p>
    </div>
  );
};

export const UserProfileButtonMenu = () => {
  const router = useRouter();

  const onLogout = React.useCallback(() => {
    router.replace("/api/auth/logout");
  }, [router]);

  return (
    <div
      style={{
        position: "absolute",
        right: "0px",
        bottom: "-8px",
        padding: "12px",
        background: "var(--violet-300)",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
        color: "var(--violet-100)",
        margin: 0,
        borderRadius: "8px 0px 8px 8px",
        display: "flex",
        flexDirection: "column",
        width: "200px",
        transformOrigin: "top",
        transform: "translate(0%, 100%)",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.userProfileButtonMenuItem} onClick={onLogout}>
        <LogoutIcon width={24} height={24} className={styles.logoutIcon} />
        <p style={{ fontSize: "14px", fontWeight: 500 }}>Logout</p>
      </div>
    </div>
  );
};
