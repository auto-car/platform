import { Room } from "@platform/model";
import { LogoHeader } from "../../components/logo-header/logo-header";
import { PageHeader } from "../../components/page-header";
import { UserContext } from "../../context/user-context";
import React from "react";
import { RoomsFilterableSection } from "../../components/rooms/rooms-filterable-section";
import { UserProfileButton } from "../../components/user-profile-button";
import { CreateRoomButtonWithDialog } from "../../components/rooms/create-room-button-with-dialog";

export default function Rooms() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [triggerReload, setTriggerReload] = React.useState(true);
  const { user, userDispatch } = React.useContext(UserContext);

  const getRooms = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_WORKER_URL}/user/rooms?id=${user.id}`
      );
      const rooms = await response.json<Room[]>();
      setRooms(rooms);
      setTriggerReload(false);
      userDispatch({ type: "rooms", payload: rooms });
    } catch (e) {
      console.error(e as Error);
    }
  }, [user, userDispatch]);

  React.useEffect(() => {
    if (triggerReload && user.id !== "") {
      getRooms();
    }
  }, [triggerReload, getRooms, user]);

  const doReload = React.useCallback(() => {
    setTriggerReload(true);
  }, []);

  return (
    <>
      <PageHeader title='AutoCAR | Rooms' />
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100vw",
          minHeight: "100vh",
          background: "var(--violet-500)",
        }}
      >
        <LogoHeader size='small' />
        <div
          style={{
            padding: "48px 17.5%",
            color: "var(--violet-100)",
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            width: "100%",
          }}
        >
          <hgroup>
            <h1 style={{ fontSize: "28px" }}>Rooms</h1>
            <span style={{ opacity: 0.75, fontSize: "16px" }}>
              View all your rooms in one place.
            </span>
          </hgroup>
          <CreateRoomButtonWithDialog doReload={doReload} />
          <RoomsFilterableSection filterOn='recentlyCreated' rooms={rooms} />
          <RoomsFilterableSection filterOn='roomsWithUser' rooms={rooms} />
        </div>
        <UserProfileButton />
      </main>
    </>
  );
}
