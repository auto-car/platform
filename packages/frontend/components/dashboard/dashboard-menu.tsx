import React from "react";
import Image from "next/image";
import { AnalyseIcon } from "../../icons/analyse-icon";
import { ExpandIcon } from "../../icons/expand-icon";
import { PredictIcon } from "../../icons/predict-icon";
import { PresentIcon } from "../../icons/present-icon";
import styles from "./dashboard-screen.module.css";
import { MenuItem, MenuItemNarrow } from "./menu-item";
import { MenuType } from "./types";

interface DashboardMenuProps {
  selectedScreen: MenuType;
  handleSelection: (type: MenuType) => void;
  showExpanded: boolean;
  handleExpand: VoidFunction;
}
export const DashboardMenu: React.FC<DashboardMenuProps> = ({
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
            <Image alt='logo' src='/logo.svg' width={36} height={36} />
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
            <Image alt='logo' src='/logo.svg' width={36} height={36} />
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
