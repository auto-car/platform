import React, { ReactElement } from "react";
import { LiveList, LiveObject } from "@liveblocks/client";
import Image from "next/image";
import { AnalyseIcon } from "../../icons/analyse-icon";
import { ExpandIcon } from "../../icons/expand-icon";
import { PredictIcon } from "../../icons/predict-icon";
import { PresentIcon } from "../../icons/present-icon";
import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from "../../liveblocks.config";
import { AnalyseView } from "./analyse-view";
import styles from "./dashboard-screen.module.css";
import { PredictView } from "./predict-view";
import { PresentView } from "./present-view";

export enum MenuType {
  ANALYSE = "analyse",
  PREDICT = "predict",
  PRESENT = "present",
}

interface DashboardScreenProps {
  roomId: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ roomId }) => {
  const updateMyPresence = useUpdateMyPresence();
  const selectedScreen = (
    useStorage((root) => root.selectedScreen) as { selectedScreen: MenuType }
  ).selectedScreen;

  const showExpanded = (
    useStorage((root) => root.showExpanded) as { showExpanded: boolean }
  ).showExpanded;

  const availableColours = useStorage(
    (root) => root.availableColours
  ) as string[];

  const updateAvailableColours = useMutation(({ storage }, colour) => {
    const mutableAvailableColours = storage.get("availableColours") as LiveList<
      string[]
    >;
    if (mutableAvailableColours) {
      mutableAvailableColours.delete(mutableAvailableColours.indexOf(colour));
      localStorage.setItem("selectedColour", colour);
    }
  }, []);

  const updateRoomScreen = useMutation(({ storage }, type) => {
    const mutableScreen = storage.get("selectedScreen") as LiveObject<{
      selectedScreen: MenuType;
    }>;
    if (mutableScreen) {
      mutableScreen.set("selectedScreen", type);
    }
  }, []);

  const updateExpandMenu = useMutation(({ storage }) => {
    const mutableShowExpanded = storage.get("showExpanded") as LiveObject<{
      showExpanded: boolean;
    }>;
    if (mutableShowExpanded) {
      mutableShowExpanded.set(
        "showExpanded",
        !mutableShowExpanded.get("showExpanded")
      );
    }
  }, []);

  const handleExpand = React.useCallback(() => {
    updateExpandMenu();
  }, [updateExpandMenu]);

  const handleSelection = React.useCallback(
    (type: MenuType) => {
      updateRoomScreen(type);
    },
    [updateRoomScreen]
  );

  const getUsername = React.useCallback(() => {
    const user = localStorage.getItem(`room-username`);
    if (user) return user;
    return "Bob";
  }, []);

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

  React.useEffect(() => {
    updateColour();
  }, []);

  if (roomId === "") return <></>;

  const getUserColour = () => {
    const userBg = document.documentElement.style.getPropertyValue("--user-bg");
    return userBg.split("--")[1]?.split("-")[0] || "blue";
  };

  return (
    <>
      <div
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
      </div>
    </>
  );
};

const DashboardCursors = () => {
  const others = useOthers();
  // If a cursor is on screen (not null), render
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        return presence.cursor ? (
          <Cursor
            userColour={presence.userColour as string}
            x={
              (presence.cursor as { x: number; y: number })["x"] *
              window.innerWidth
            }
            user={presence.user as string}
            y={
              (presence.cursor as { x: number; y: number })["y"] *
              window.innerHeight
            }
            key={connectionId}
          />
        ) : null;
      })}
    </>
  );
};

const Cursor = ({
  x,
  y,
  user,
  userColour,
}: {
  x: number;
  y: number;
  user: string;
  userColour: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        position: "absolute",
        left: 0,
        top: 0,
        transition: "transform 120ms linear",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <Image src="/cursor.svg" alt="cursor" width={36} height={36} />
      <div
        style={{
          borderRadius: "24px",
          background: `var(--${userColour}-200)`,
          color: `var(--${userColour}-500)`,
          padding: "8px 12px",
        }}
      >
        <p style={{ fontWeight: 500 }}>{user}</p>
      </div>
    </div>
  );
};

interface DashboardMenuProps {
  selectedScreen: MenuType;
  handleSelection: (type: MenuType) => void;
  showExpanded: boolean;
  handleExpand: VoidFunction;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  selectedScreen,
  handleSelection,
  showExpanded,
  handleExpand,
}) => {
  const [showExpandButton, setShowExpandButton] = React.useState(false);
  const menuItems = [
    {
      label: "Analyse",
      type: MenuType.ANALYSE,
      icon: (
        <AnalyseIcon className={styles.menuItemIcon} width={24} height={24} />
      ),
    },
    {
      label: "Predict",
      type: MenuType.PREDICT,
      icon: (
        <PredictIcon className={styles.menuItemIcon} width={24} height={24} />
      ),
    },
    {
      label: "Present",
      type: MenuType.PRESENT,
      icon: (
        <PresentIcon className={styles.menuItemIcon} width={24} height={24} />
      ),
      description: "Share presentations/dashboards",
    },
  ];

  return (
    <aside
      className={
        showExpanded ? styles.dashboardMenu : styles.dashboardMenuNarrow
      }
      onPointerOver={() => setShowExpandButton(true)}
      onPointerLeave={() => setShowExpandButton(false)}
    >
      {showExpandButton ? (
        <button className={styles.expandButton} onClick={handleExpand}>
          <ExpandIcon
            width={14}
            height={14}
            className={
              showExpanded ? styles.expandIconFlipped : styles.expandIcon
            }
          />
        </button>
      ) : null}
      {showExpanded ? (
        <>
          <div className={styles.menuLogoHeader}>
            <Image alt="logo" src="/logo.svg" width={36} height={36} />
            <hgroup className={styles.menuLogoHeaderHeadings}>
              <h2>AutoCAR</h2>
              <p className={styles.menuLogoSubtitle}>
                CAR T-Cell Research with Collaboration
              </p>
            </hgroup>
          </div>
          <div className={styles.divider} />
          <div className={styles.menuList}>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                {...menuItem}
                isSelected={menuItem.type === selectedScreen}
                handleSelection={handleSelection}
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.menuLogoHeader}>
            <Image alt="logo" src="/logo.svg" width={36} height={36} />
          </div>
          <div className={styles.divider} />
          <div className={styles.menuList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemNarrow
                {...menuItem}
                isSelected={menuItem.type === selectedScreen}
                handleSelection={handleSelection}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

interface MenuItemProps {
  label: string;
  type: MenuType;
  icon: ReactElement;
  handleSelection: (type: MenuType) => void;
  isSelected: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  type,
  handleSelection,
  isSelected = false,
}) => {
  const itemClassName = !isSelected ? styles.menuItem : styles.menuItemSelected;
  return (
    <button className={itemClassName} onClick={() => handleSelection(type)}>
      {icon}
      <hgroup className={styles.menuItemInfo}>
        <h3 className={styles.menuItemTitle}>{label}</h3>
      </hgroup>
    </button>
  );
};

const MenuItemNarrow: React.FC<MenuItemProps> = ({
  label,
  icon,
  type,
  handleSelection,
  isSelected = false,
}) => {
  const itemClassName = !isSelected
    ? styles.menuItemNarrow
    : styles.menuItemSelectedNarrow;
  return (
    <button className={itemClassName} onClick={() => handleSelection(type)}>
      {icon}
    </button>
  );
};

interface DashboardRendererProps {
  selectedScreen: MenuType;
}

const DashboardRenderer: React.FC<DashboardRendererProps> = ({
  selectedScreen,
}) => {
  const getView = () => {
    switch (selectedScreen) {
      case MenuType.ANALYSE:
        return <AnalyseView />;
      case MenuType.PREDICT:
        return <PredictView />;
      case MenuType.PRESENT:
        return <PresentView />;
    }
  };
  return <main className={styles.dashboardView}>{getView()}</main>;
};
