import React from "react";
import { RoomCard } from "./room-card";
import { RoomsFilterSelector } from "./rooms-filter-selector";

interface RoomsFilterableSectionProps {
  filterOn: "recentlyCreated" | "roomsWithUser";
  rooms: any[];
}

export const RoomsFilterableSection: React.FC<RoomsFilterableSectionProps> = ({
  filterOn,
  rooms,
}) => {
  const title = React.useMemo(() => {
    switch (filterOn) {
      case "recentlyCreated":
        return "Recently Created";
      case "roomsWithUser":
        return "All Rooms with You";
    }
  }, [filterOn]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "12px",
      }}
    >
      <hgroup
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>{title}</h2>
        <RoomsFilterSelector />
      </hgroup>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {rooms.map((_, index) => (
          <RoomCard key={index} />
        ))}
      </div>
    </section>
  );
};
