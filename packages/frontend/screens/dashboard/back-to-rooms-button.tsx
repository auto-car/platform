import React from "react";
import styles from "../../components/dashboard/dashboard-screen.module.css";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const BackToRoomsButton = () => {
  const router = useRouter();
  const goBackToRooms = React.useCallback(() => {
    router.push("/rooms");
  }, [router]);

  return (
    <button
      style={{
        fontSize: "10px",
        fontWeight: 600,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
        outline: "none",
        border: "none",
        background: "none",
        color: "var(--violet-200)",
        padding: "0px",
        marginBottom: "-16px",
      }}
      onClick={goBackToRooms}
    >
      <ChevronLeftIcon width={4} height={4} className={styles.shareIcon} />
      Back to Rooms
    </button>
  );
};
