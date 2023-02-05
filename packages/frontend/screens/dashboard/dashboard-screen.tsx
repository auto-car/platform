/* eslint-disable @next/next/no-img-element */
import React from "react";
import { LiveList, LiveObject } from "@liveblocks/client";
import {
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "../../liveblocks.config";
import styles from "./dashboard-screen.module.css";
import { DashboardRenderer } from "../../components/dashboard/dashboard-renderer";
import { DashboardMenu } from "../../components/dashboard/dashboard-menu";
import { DashboardCursors } from "../../components/dashboard/dashboard-cursors";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { Room } from "@platform/model";
import { LogoHeader } from "components/logo-header/logo-header";
import { UserProfileButton } from "components/user-profile-button";
import { getTimeAgo } from "components/rooms/room-card";
import { UserAvatar } from "components/avatar/user-avatar";
import { ShareIcon } from "icons/share-icon";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { UploadIcon } from "icons/upload-icon";
import { useRouter } from "next/router";

interface DashboardScreenProps {
  roomId: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ roomId }) => {
  const router = useRouter();
  const [room, setRoom] = React.useState<Room>({
    name: "",
    id: roomId,
    createdAt: new Date(),
    members: [],
    owner: { id: "", name: "", picture: "" },
    updatedAt: new Date(),
  });

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

  const goBackToRooms = React.useCallback(() => {
    router.push("/rooms");
  }, [router]);

  // const updateMyPresence = useUpdateMyPresence();
  // const selectedScreen = (
  //   useStorage((root) => root.selectedScreen) as { selectedScreen: MenuType }
  // ).selectedScreen;

  // const showExpanded = (
  //   useStorage((root) => root.showExpanded) as { showExpanded: boolean }
  // ).showExpanded;

  // const availableColours = useStorage(
  //   (root) => root.availableColours
  // ) as string[];

  // const updateAvailableColours = useMutation(({ storage }, colour) => {
  //   const mutableAvailableColours = storage.get("availableColours") as LiveList<
  //     string[]
  //   >;
  //   if (mutableAvailableColours) {
  //     mutableAvailableColours.delete(mutableAvailableColours.indexOf(colour));
  //     localStorage.setItem("selectedColour", colour);
  //   }
  // }, []);

  // const updateRoomScreen = useMutation(({ storage }, type) => {
  //   const mutableScreen = storage.get("selectedScreen") as LiveObject<{
  //     selectedScreen: MenuType;
  //   }>;
  //   if (mutableScreen) {
  //     mutableScreen.set("selectedScreen", type);
  //   }
  // }, []);

  // const updateExpandMenu = useMutation(({ storage }) => {
  //   const mutableShowExpanded = storage.get("showExpanded") as LiveObject<{
  //     showExpanded: boolean;
  //   }>;
  //   if (mutableShowExpanded) {
  //     mutableShowExpanded.set(
  //       "showExpanded",
  //       !mutableShowExpanded.get("showExpanded")
  //     );
  //   }
  // }, []);

  // const handleExpand = React.useCallback(() => {
  //   updateExpandMenu();
  // }, [updateExpandMenu]);

  // const handleSelection = React.useCallback(
  //   (type: MenuType) => {
  //     updateRoomScreen(type);
  //   },
  //   [updateRoomScreen]
  // );

  // const getUsername = React.useCallback(() => {
  //   const user = localStorage.getItem(`room-username`);
  //   if (user) return user;
  //   return "Bob";
  // }, []);

  // const updateColour = React.useCallback(() => {
  //   const colourIsSelected = localStorage.getItem("selectedColour");
  //   if (availableColours && !colourIsSelected) {
  //     const colourIndex = Math.floor(Math.random() * availableColours.length);
  //     document.documentElement.style.setProperty(
  //       "--user-bg",
  //       `var(--${availableColours[colourIndex]}-400)`
  //     );
  //     document.documentElement.style.setProperty(
  //       "--user-text",
  //       `var(--${availableColours[colourIndex]}-100)`
  //     );
  //     updateAvailableColours(availableColours[colourIndex]);
  //   } else if (colourIsSelected) {
  //     document.documentElement.style.setProperty(
  //       "--user-bg",
  //       `var(--${colourIsSelected}-400)`
  //     );
  //     document.documentElement.style.setProperty(
  //       "--user-text",
  //       `var(--${colourIsSelected}-100)`
  //     );
  //   }
  // }, [availableColours, updateAvailableColours]);

  // React.useEffect(() => {
  //   updateColour();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (roomId === "") return <></>;

  // const getUserColour = () => {
  //   const userBg = document.documentElement.style.getPropertyValue("--user-bg");
  //   return userBg.split("--")[1]?.split("-")[0] || "blue";
  // };

  const [bounds, setBounds] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setBounds(() => ({ x: window.innerWidth * 2, y: window.innerHeight * 2 }));
    getRoom();
  }, [getRoom]);

  React.useEffect(() => {
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
  }, []);

  const handlePan = React.useCallback((ref: ReactZoomPanPinchRef) => {
    ref.instance.bounds = {
      minPositionX: -window.innerWidth * 2,
      minPositionY: -window.innerHeight * 2,
      maxPositionX: 0,
      maxPositionY: 0,
    };
  }, []);

  return (
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
      {/* <TransformWrapper
        minScale={0.2}
        initialScale={1}
        onPanning={(ref) => {
          handlePan(ref);
        }}
      > */}
      {/* <TransformComponent> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "var(--violet-200)",
          width: "100%",
        }}
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
          <button
            style={{
              fontSize: "10px",
              fontWeight: 600,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              outline: "none",
              border: "none",
              background: "none",
              color: "var(--violet-200)",
              padding: "0px",
              marginBottom: "-16px",
            }}
            onClick={goBackToRooms}
          >
            <ChevronLeftIcon
              width={4}
              height={4}
              className={styles.shareIcon}
            />
            Back to Rooms
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
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
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "var(--violet-400)",
                outline: "none",
                border: "none",
                color: "var(--violet-100)",
                padding: "16px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 500,
                gap: "6px",
                fontSize: "12px",
              }}
            >
              <ShareIcon className={styles.shareIcon} width={12} height={12} />
              <p>Share Room</p>
            </button>
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
            <aside
              style={{
                height: "700px",
                width: "320px",
                background: "var(--violet-400)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "calc(100% - 48px)",
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <hgroup style={{ color: "var(--violet-100)" }}>
                  <h3>Datasets</h3>
                  <p style={{ fontSize: "12px" }}>
                    Select up to 2 datasets to analyse.
                  </p>
                </hgroup>
                <DatasetCategory
                  items={[{ id: "mock-id", name: "Example Dataset A" }]}
                  name='10X Genomics'
                />
                <DatasetCategory
                  items={[{ id: "mock-id", name: "Example Dataset B" }]}
                  name='UNSW Immunogenics'
                  canUpload
                />
              </div>
            </aside>
            <div
              style={{
                background: "var(--violet-400)",
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "calc(100% - 48px)",
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <hgroup style={{ color: "var(--violet-100)" }}>
                  <h3>Analysis</h3>
                  <p style={{ fontSize: "12px" }}>
                    Collaboratively view, annotate your dataset&apos;s UMAP
                    diagram.
                  </p>
                </hgroup>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--violet-200)",
                      opacity: 0.8,
                    }}
                  >
                    Select or upload a dataset on the left menu to get started!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* </TransformComponent> */}
      {/* <div
          className={styles.dashboard}
          onPointerMove={(e) => {
            updateMyPresence({
              cursor: {
                x: Math.round(e.clientX) / window.innerWidth,
                y: Math.round(e.clientY) / window.innerHeight,
              },
              user: getUsername(),
              userColour: getUserColour(),
            });
          }}
          onPointerLeave={() => updateMyPresence({ cursor: null })}
        >
          <div className={styles.dashboardContainer}>
            <DashboardMenu
              selectedScreen={selectedScreen}
              handleSelection={handleSelection}
              handleExpand={handleExpand}
              showExpanded={showExpanded}
            />
            <DashboardRenderer selectedScreen={selectedScreen} />
          </div>
          <DashboardCursors />
        </div> */}
      {/* </TransformWrapper> */}
    </div>
  );
};

interface DatasetCategoryProps {
  name: string;
  items: DatasetMenuItemProps[];
  canUpload?: boolean;
}

const DatasetCategory: React.FC<DatasetCategoryProps> = ({
  items,
  name,
  canUpload = false,
}) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h4 style={{ fontWeight: 600 }}>{name}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "12px",
        }}
      >
        {items.map((item) => (
          <DatasetMenuItem {...item} key={item.id} />
        ))}
        {canUpload ? (
          <button
            style={{
              color: "var(--violet-100)",
              padding: "12px",
              background: "var(--violet-500)",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <UploadIcon width={20} height={20} className={styles.shareIcon} />
            <p style={{ fontSize: "12px", fontWeight: 500 }}>
              Upload New Dataset
            </p>
          </button>
        ) : null}
      </div>
    </section>
  );
};

interface DatasetMenuItemProps {
  id: string;
  name: string;
}

const DatasetMenuItem: React.FC<DatasetMenuItemProps> = ({ name }) => {
  return (
    <button
      style={{
        border: "none",
        outline: "none",
        width: "100%",
        padding: "12px 12px",
        color: "var(--violet-100)",
        background: "var(--violet-300)",
        borderRadius: "4px",
        textAlign: "left",
        fontSize: "12px",
        fontWeight: 500,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      {name}
      <span>
        <ChevronRightIcon color='var(--violet-100)' width={4} height={4} />
      </span>
    </button>
  );
};
