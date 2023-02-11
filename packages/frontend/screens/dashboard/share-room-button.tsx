import React from "react";
import styles from "../../components/dashboard/dashboard-screen.module.css";
import { ShareIcon } from "icons/share-icon";

export const ShareRoomButton = () => {
  return (
    <button
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "var(--violet-400)",
        outline: "none",
        border: "none",
        color: "var(--violet-100)",
        padding: "16px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: 500,
        gap: "6px",
        fontSize: "12px",
      }}
    >
      <ShareIcon className={styles.shareIcon} width={12} height={12} />
      <p>Share Room</p>
    </button>
  );
};
