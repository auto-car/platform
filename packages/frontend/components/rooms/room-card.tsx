import React from "react";
import { AvatarGroup } from "../avatar/avatar-group";

export const RoomCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "320px",
        width: "360px",
        borderRadius: "8px",
        background: "var(--violet-400)",
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
          padding: "24px",
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
          <h3 style={{ fontWeight: 500 }}>My Room</h3>
          <span
            style={{
              color: "var(--violet-100)",
              opacity: 0.75,
              fontSize: "14px",
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
