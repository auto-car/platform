import { Room } from "@platform/model";
import { useRouter } from "next/router";
import React from "react";
import { AvatarGroup } from "../avatar/avatar-group";

export const RoomCard: React.FC<Room> = ({
  createdAt,
  id,
  members,
  name,
  owner,
  updatedAt,
}) => {
  const router = useRouter();
  const handleRedirect = React.useCallback(() => {
    router.push(`/dashboard?room=${id}`);
  }, [router, id]);

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
      onClick={handleRedirect}
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
          <h4 style={{ fontWeight: 500, fontSize: "16px" }}>{name}</h4>
          <span
            style={{
              color: "var(--violet-100)",
              opacity: 0.75,
              fontSize: "12px",
            }}
          >
            {getTimeAgo(new Date(updatedAt))}
          </span>
        </div>
        <AvatarGroup avatars={members} />
      </div>
    </div>
  );
};

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export const getTimeAgo = (date: Date) => {
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

  if (secondsAgo < MINUTE) {
    return secondsAgo + ` second${secondsAgo !== 1 ? "s" : ""} ago`;
  }

  let divisor;
  let unit = "";

  if (secondsAgo < HOUR) {
    [divisor, unit] = [MINUTE, "min"];
  } else if (secondsAgo < DAY) {
    [divisor, unit] = [HOUR, "hour"];
  } else if (secondsAgo < WEEK) {
    [divisor, unit] = [DAY, "day"];
  } else if (secondsAgo < MONTH) {
    [divisor, unit] = [WEEK, "week"];
  } else if (secondsAgo < YEAR) {
    [divisor, unit] = [MONTH, "month"];
  } else {
    [divisor, unit] = [YEAR, "year"];
  }

  const count = Math.floor(secondsAgo / divisor);
  return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
};
