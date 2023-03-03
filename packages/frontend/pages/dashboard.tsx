import React from "react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { useRouter } from "next/router";
import { PageHeader } from "../components/page-header";
import { RoomProvider } from "../liveblocks.config";
import { DashboardScreen } from "../screens/dashboard/dashboard-screen";
import { RoomContent } from "@platform/model";
import { MenuType } from "../components/dashboard/types";
import { LoadingScreen } from "../screens/common/loading-screen";

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
    datasetUmapURL: new LiveObject({ datasetUmapURL: "" }),
    loadingDatasetUMAP: new LiveObject({ loadingDatasetUMAP: false }),
    selectedDataset: new LiveObject({ selectedDataset: null }),
  };

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null }}
      initialStorage={{ ...initialStorage }}
    >
      <PageHeader title='AutoCAR | Dashboard' />
      <ClientSideSuspense fallback={<LoadingScreen />}>
        {() => <DashboardScreen roomId={roomId} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
