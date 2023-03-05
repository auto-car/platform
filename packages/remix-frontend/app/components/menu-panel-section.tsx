import React from "react";
import { TeamsIcon } from "app/icons/teams-icon";
import homeStyles from "../styles/home.module.css";
import { type LabsCategory, type Team } from "app/utils/constants";
import { LabsIcon } from "app/icons/labs-icon";

export interface MenuPanelSectionProps {
  type: "teams" | "labs";
  items: Team[] | LabsCategory[];
  selected: Team | LabsCategory;
  handleSelectItem: (item: Team | LabsCategory) => void;
}

export interface MenuItemProps {
  title: string;
}

export const MenuPanelSection: React.FC<MenuPanelSectionProps> = ({
  items,
  type,
  selected,
  handleSelectItem,
}) => {
  const sectionTitle = React.useMemo(
    () => (type === "teams" ? "Teams" : "Laboratories"),
    [type]
  );

  const sectionAddText = React.useMemo(
    () => (type === "teams" ? "+ Add new team" : "+ Create new laboratory"),
    [type]
  );

  const sectionIcon = React.useMemo(
    () =>
      type === "teams" ? (
        <TeamsIcon width={16} height={16} className={homeStyles.sectionIcon} />
      ) : (
        <LabsIcon width={16} height={16} className={homeStyles.sectionIcon} />
      ),
    [type]
  );

  return (
    <div className={homeStyles.menuPanelSection}>
      <div className={homeStyles.sectionHeader}>
        {sectionIcon}
        <h5 className={homeStyles.sectionTitle}>{sectionTitle}</h5>
      </div>
      <div className={homeStyles.sectionItems}>
        {items.map((item, key) => (
          <button
            key={key}
            className={
              item.name === selected.name
                ? homeStyles.sectionItemSelected
                : homeStyles.sectionItem
            }
            onClick={() => handleSelectItem({ ...item })}
          >
            {item.name}
          </button>
        ))}
        <button className={homeStyles.sectionAddButton}>
          {sectionAddText}
        </button>
      </div>
    </div>
  );
};
