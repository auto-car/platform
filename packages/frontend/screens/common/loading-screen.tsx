import React from "react";
import { LoadingDialog } from "../../components/dashboard/loading-dialog";

export const LoadingScreen = () => (
  <div
    style={{
      background: "var(--violet-500)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      color: "var(--violet-100)",
      gap: "24px",
    }}
  >
    <LoadingDialog
      title='Loading your room...'
      expectedTime={1}
      isOpen={true}
    />
  </div>
);
