import React from "react";
import { AvatarGroup } from "../avatar/avatar-group";

export const RoomCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "260px",
        width: "320px",
        borderRadius: "8px",
        background: "var(--violet-400)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: "240px",
          background: "var(--violet-500)",
          opacity: 0.2,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          width: "calc(100% - 48px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4 style={{ fontWeight: 500, fontSize: "16px" }}>My Room</h4>
          <span
            style={{
              color: "var(--violet-100)",
              opacity: 0.75,
              fontSize: "12px",
            }}
          >
            Updated 3 days ago
          </span>
        </div>
        <AvatarGroup avatars={[1, 2, 3]} />
      </div>
    </div>
  );
};
