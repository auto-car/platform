import React from "react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import { PageHeader } from "../components/page-header";
import { RoomProvider, useOthers } from "../liveblocks.config";
import {
  DashboardScreen,
  MenuType,
} from "../screens/dashboard/dashboard-screen";

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
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null }}
      initialStorage={{
        selectedScreen: new LiveObject({
          selectedScreen: MenuType.ANALYSE,
        }),
        showExpanded: new LiveObject({ showExpanded: false }),
        showGraph: new LiveObject({ showGraph: false }),
        annotations: new LiveList<{
          id: string;
          annotations: {
            x: number;
            y: number;
            comment: string;
            colour: string;
          }[];
        }>([]),
        availableColours: new LiveList<string>([
          "green",
          "violet",
          "blue",
          "orange",
          "pink",
        ]),
      }}
    >
      <PageHeader title="AutoCAR | Dashboard" />
      <ClientSideSuspense fallback={<LoadingScreen />}>
        {() => <DashboardScreen roomId={roomId} />}
      </ClientSideSuspense>
    </RoomProvider>
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
    <GridLoader color="var(--violet-100)" size={24} />
    <h1>Loading...</h1>
  </div>
);
