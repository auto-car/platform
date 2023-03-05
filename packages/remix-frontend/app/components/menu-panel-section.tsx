import React from "react";
import { TeamsIcon } from "app/icons/teams-icon";
import homeStyles from "../styles/home.module.css";

export interface MenuPanelSectionProps {
  type: "teams" | "labs";
  items: MenuItemProps[];
  selected: MenuItemProps;
  handleSelectItem: (item: MenuItemProps) => void;
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

  return (
    <div className={homeStyles.menuPanelSection}>
      <div className={homeStyles.sectionHeader}>
        <TeamsIcon width={16} height={16} className={homeStyles.sectionIcon} />
        <h5 className={homeStyles.sectionTitle}>{sectionTitle}</h5>
      </div>
      <div className={homeStyles.sectionItems}>
        {items.map((item, key) => (
          <button
            key={key}
            className={
              item.title === selected.title
                ? homeStyles.sectionItemSelected
                : homeStyles.sectionItem
            }
            onClick={() => handleSelectItem(item)}
          >
            {item.title}
          </button>
        ))}
        <button className={homeStyles.sectionAddButton}>
          {sectionAddText}
        </button>
      </div>
    </div>
  );
};
