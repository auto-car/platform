/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "../../liveblocks.config";
import { DashboardCursors } from "../../components/dashboard/dashboard-cursors";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { DatasetCategory, Room, Dataset, RoomContent } from "@platform/model";
import { LogoHeader } from "components/logo-header/logo-header";
import { UserProfileButton } from "components/user-profile-button";
import { PageHeader } from "components/page-header";
import { BackToRoomsButton } from "./back-to-rooms-button";
import { RoomHeader } from "./room-header";
import { ShareRoomButton } from "./share-room-button";
import { DatasetsMenu } from "./datasets-menu";
import { UMAPAnalysisPanel } from "./umap-analysis-panel";
import { UserContext } from "../../context/user-context";

interface DashboardScreenProps {
  roomId: string;
}

export interface DatasetOption {
  value: string;
  label: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ roomId }) => {
  const [room, setRoom] = React.useState<Room>({
    name: "",
    id: roomId,
    createdAt: new Date(),
    members: [],
    owner: { id: "", name: "", picture: "" },
    updatedAt: new Date(),
  });
  const [datasets, setDatasets] = React.useState<DatasetCategory[]>([]);
  const { user } = React.useContext(UserContext);

  const getRoom = React.useCallback(async () => {
    try {
      if (roomId !== "") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ROOM_WORKER_URL}/room?id=${roomId}`
        );
        const roomFromAPI = await response.json<Room>();
        setRoom(roomFromAPI);
      }
    } catch (e) {
      console.error(e as Error);
    }
  }, [roomId]);

  const [doReload, setDoReload] = React.useState(true);
  const getDatasets = React.useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8787/datasets`);
      const datasetsFromResponse = await response.json<DatasetCategory[]>();
      setDatasets(datasetsFromResponse);
    } catch (e) {
      console.error(e as Error);
    }
    setDoReload(false);
  }, []);

  const updateMyPresence = useUpdateMyPresence();
  const availableColours = useStorage(
    (root) => root.availableColours
  ) as string[];

  const updateAvailableColours = useMutation(({ storage }, colour) => {
    const mutableAvailableColours = storage.get(
      "availableColours"
    ) as RoomContent["availableColours"];
    if (mutableAvailableColours) {
      mutableAvailableColours.delete(mutableAvailableColours.indexOf(colour));
      localStorage.setItem("selectedColour", colour);
    }
  }, []);

  const lBSelectedDataset = (
    useStorage((root) => root.selectedDataset) as {
      selectedDataset: string | null;
    }
  ).selectedDataset;

  const lBLoadingDatasetUMAP = (
    useStorage((root) => root.loadingDatasetUMAP) as {
      loadingDatasetUMAP: boolean;
    }
  ).loadingDatasetUMAP;

  const lBDatasetUmapURL = (
    useStorage((root) => root.datasetUmapURL) as {
      datasetUmapURL: string;
    }
  ).datasetUmapURL;

  const updateLBSelectedDataset = useMutation(
    ({ storage }, dataset: string | null) => {
      const mutableDataset = storage.get(
        "selectedDataset"
      ) as RoomContent["selectedDataset"];
      if (mutableDataset) {
        mutableDataset.set("selectedDataset", dataset);
      }
    },
    []
  );

  const updateLBLoadingDatasetUMAP = useMutation(
    ({ storage }, loadingDatasetUMAP: boolean) => {
      const mutableDataset = storage.get(
        "loadingDatasetUMAP"
      ) as RoomContent["loadingDatasetUMAP"];
      if (mutableDataset) {
        mutableDataset.set("loadingDatasetUMAP", loadingDatasetUMAP);
      }
    },
    []
  );

  const updateLBDatasetUmapURL = useMutation(
    ({ storage }, datasetUmapURL: string) => {
      const mutableDataset = storage.get(
        "datasetUmapURL"
      ) as RoomContent["datasetUmapURL"];
      if (mutableDataset) {
        mutableDataset.set("datasetUmapURL", datasetUmapURL);
      }
    },
    []
  );

  const updateColour = React.useCallback(() => {
    const colourIsSelected = localStorage.getItem("selectedColour");
    if (availableColours && !colourIsSelected) {
      const colourIndex = Math.floor(Math.random() * availableColours.length);
      document.documentElement.style.setProperty(
        "--user-bg",
        `var(--${availableColours[colourIndex]}-400)`
      );
      document.documentElement.style.setProperty(
        "--user-text",
        `var(--${availableColours[colourIndex]}-100)`
      );
      updateAvailableColours(availableColours[colourIndex]);
    } else if (colourIsSelected) {
      document.documentElement.style.setProperty(
        "--user-bg",
        `var(--${colourIsSelected}-400)`
      );
      document.documentElement.style.setProperty(
        "--user-text",
        `var(--${colourIsSelected}-100)`
      );
    }
  }, [availableColours, updateAvailableColours]);

  const getUserColour = () => {
    const userBg = document.documentElement.style.getPropertyValue("--user-bg");
    return userBg.split("--")[1]?.split("-")[0] || "blue";
  };

  const triggerReload = React.useCallback(() => setDoReload(true), []);

  const handleSelectDataset = React.useCallback(
    (category: string, dataset: Dataset) => {
      updateLBSelectedDataset(category + "%2F" + dataset.name[0].split("/")[1]);
    },
    [updateLBSelectedDataset]
  );

  const getUmapForDataset = React.useCallback(async () => {
    if (lBLoadingDatasetUMAP || !lBSelectedDataset) return; // Don't load something if we're already loading another.
    updateLBLoadingDatasetUMAP(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8787/download-umap?datasetName=${lBSelectedDataset}`
      );
      const imageURLData = await response.json<{
        url: string;
        datasetName: string;
      }>();
      updateLBDatasetUmapURL(imageURLData.url);
    } catch (e) {
      console.error(e);
    }
    updateLBLoadingDatasetUMAP(false);
    updateLBSelectedDataset("");
  }, [
    lBLoadingDatasetUMAP,
    lBSelectedDataset,
    updateLBLoadingDatasetUMAP,
    updateLBSelectedDataset,
    updateLBDatasetUmapURL,
  ]);

  React.useEffect(() => {
    getUmapForDataset();
  }, [lBSelectedDataset, getUmapForDataset]);

  React.useEffect(() => {
    if (doReload) {
      getDatasets();
    }
  }, [getDatasets, doReload]);

  React.useEffect(() => {
    updateColour();
    getRoom();
    const html = document.getElementsByTagName("html").item(0);
    if (html) {
      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
    }
    const body = document.getElementsByTagName("body").item(0);
    if (body) {
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";
    }

    return () => {
      if (html) {
        html.style.overflow = "auto";
        html.style.overscrollBehavior = "auto";
      }
      if (body) {
        body.style.overflow = "auto";
        body.style.overscrollBehavior = "auto";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [transformRef, setTransformRef] =
    React.useState<ReactZoomPanPinchRef | null>(null);

  if (roomId === "") return <></>;

  return (
    <>
      <PageHeader title='AutoCAR | ' />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "var(--violet-500)",
        }}
      >
        <menu
          style={{
            background: "var(--violet-450)",
            margin: 0,
            padding: "12px 120px",
            boxShadow: "0px 4px 20px black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LogoHeader size='small' isRelative />
          <UserProfileButton isRelative />
        </menu>

        <TransformWrapper
          minScale={0.2}
          initialScale={1}
          onPanning={(ref) => {
            ref.instance.bounds = {
              minPositionX: -window.innerWidth * 2,
              minPositionY: -window.innerHeight * 2,
              maxPositionX: 0,
              maxPositionY: 0,
            };
          }}
          onInit={(ref) => setTransformRef(ref)}
          centerZoomedOut={false}
        >
          <TransformComponent wrapperStyle={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "var(--violet-200)",
                width: "100%",
              }}
              onPointerMove={(e) => {
                updateMyPresence({
                  cursor: {
                    x: Math.round(
                      e.clientX + (transformRef?.state.positionX || 0) * -1
                    ),
                    y: Math.round(
                      e.clientY + (transformRef?.state.positionY || 0) * -1
                    ),
                  },
                  user: user ? user.name : "Bob",
                  userColour: getUserColour(),
                });
              }}
              onPointerLeave={() => updateMyPresence({ cursor: null })}
            >
              <main
                style={{
                  padding: "36px 120px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
              >
                <BackToRoomsButton />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <RoomHeader room={room} />
                  <ShareRoomButton />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "24px",
                    width: "100%",
                  }}
                >
                  <DatasetsMenu
                    triggerReload={triggerReload}
                    datasets={datasets}
                    handleSelectDataset={handleSelectDataset}
                  />
                  <UMAPAnalysisPanel
                    lBSelectedDataset={lBSelectedDataset}
                    lBLoadingDatasetUMAP={lBLoadingDatasetUMAP}
                    lBDatasetUmapURL={lBDatasetUmapURL}
                  />
                </div>
              </main>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <DashboardCursors transformRef={transformRef} />
    </>
  );
};
