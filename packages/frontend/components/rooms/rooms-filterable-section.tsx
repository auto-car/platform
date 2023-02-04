import { Room, User } from "@platform/model";
import { UserContext } from "../../context/user-context";
import React from "react";
import { RoomCard } from "./room-card";
import { RoomsFilterSelector } from "./rooms-filter-selector";

interface RoomsFilterableSectionProps {
  filterOn: "recentlyCreated" | "roomsWithUser";
  rooms: Room[];
}

export enum FilterType {
  All = "all",
  CreatedByMe = "createdByMe",
  SharedWithMe = "sharedWithMe",
}

export const RoomsFilterableSection: React.FC<RoomsFilterableSectionProps> = ({
  filterOn,
  rooms,
}) => {
  const [filteredRooms, setFilteredRooms] = React.useState<Room[]>(rooms);
  const { user } = React.useContext(UserContext);

  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>(
    FilterType.All
  );
  const handleFilterSelection = React.useCallback((filterType: FilterType) => {
    setSelectedFilter(filterType);
  }, []);

  const title = React.useMemo(() => {
    switch (filterOn) {
      case "recentlyCreated":
        return "Recently Created";
      case "roomsWithUser":
        return "All Rooms with You";
    }
  }, [filterOn]);

  const emptyStateText = React.useMemo(
    () => getEmptyStateText(selectedFilter),
    [selectedFilter]
  );

  React.useEffect(() => {
    applyFilterToRooms(selectedFilter, rooms, user);
  }, [selectedFilter, rooms, user]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "8px",
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
        <h2 style={{ fontSize: "20px", color: "var(--violet-200)" }}>
          {title}
        </h2>
        <RoomsFilterSelector
          selectedFilter={selectedFilter}
          handleSelection={handleFilterSelection}
        />
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
        {rooms.length > 0 ? (
          rooms.map((_, index) => <RoomCard key={index} />)
        ) : (
          <p style={{ color: "var(--violet-100)", opacity: 0.5 }}>
            {emptyStateText}
          </p>
        )}
      </div>
    </section>
  );
};

const getEmptyStateText = (selectedFilter: FilterType) => {
  switch (selectedFilter) {
    case FilterType.All:
      return "You have not created any rooms, and have not been invited to any yet.";
    case FilterType.CreatedByMe:
      return "You have not created any rooms.";
    case FilterType.SharedWithMe:
      return "You have not been invited to any rooms.";
  }
};

const applyFilterToRooms = (
  selectedFilter: FilterType,
  rooms: Room[],
  user: User
) => {
  switch (selectedFilter) {
    case FilterType.All:
      return rooms;
    case FilterType.CreatedByMe:
      return rooms.filter((room) => room.owner.id === user.id);
    case FilterType.SharedWithMe:
      return rooms.filter(
        (room) =>
          room.members.filter((member) => member.id === user.id).length > 0
      );
  }
};
