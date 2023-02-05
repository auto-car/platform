import React from "react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import { PageHeader } from "../components/page-header";
import { RoomProvider } from "../liveblocks.config";
import { DashboardScreen } from "../screens/dashboard/dashboard-screen";
import { RoomContent } from "@platform/model";
import { MenuType } from "../components/dashboard/types";

export default function Dashboard() {
  const [roomId, setRoomId] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (router.asPath.includes("room")) {
      setRoomId(router.asPath.split("?room=")[1]);
    }
  }, [router]);

  if (roomId === "") {
    return <LoadingScreen />;
  }

  const initialStorage: RoomContent = {
    annotations: new LiveList([]),
    availableColours: new LiveList([
      "blue",
      "green",
      "orange",
      "pink",
      "violet",
    ]),
    id: roomId,
    selectedScreen: new LiveObject({ selectedScreen: MenuType.ANALYSE }),
  };

  return (
    // <RoomProvider
    //   id={roomId}
    //   initialPresence={{ cursor: null }}
    //   initialStorage={{ ...initialStorage }}
    // >
    //   <PageHeader title='AutoCAR | Dashboard' />
    //   <ClientSideSuspense fallback={<LoadingScreen />}>
    //     {() => <DashboardScreen roomId={roomId} />}
    //   </ClientSideSuspense>
    // </RoomProvider>
    <DashboardScreen roomId={roomId} />
  );
}

const LoadingScreen = () => (
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
    <GridLoader color='var(--violet-100)' size={24} />
    <h1>Loading...</h1>
  </div>
);
