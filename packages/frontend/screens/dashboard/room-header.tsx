import React from "react";
import { Room } from "@platform/model";
import { getTimeAgo } from "components/rooms/room-card";
import { UserAvatar } from "components/avatar/user-avatar";

export const RoomHeader = ({ room }: { room: Room }) => {
  return (
    <hgroup>
      <h1 style={{ fontSize: "28px", color: "var(--violet-100)" }}>
        {room.name}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          color: "var(--violet-100-meta)",
        }}
      >
        <p style={{ fontSize: "12px" }}>
          Updated {getTimeAgo(new Date(room.updatedAt))}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UserAvatar
            name={room.owner.name}
            src={room.owner.picture}
            size='small'
          />{" "}
          <p
            style={{
              fontSize: "12px",
            }}
          >
            {room.owner.name}
          </p>
        </div>
      </div>
    </hgroup>
  );
};
