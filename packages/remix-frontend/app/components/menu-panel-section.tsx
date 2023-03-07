import React from "react";
import homeStyles from "../styles/home.module.css";
import { type LabsCategory, type DataCollection } from "app/utils/constants";
import { LabsIcon } from "app/icons/labs-icon";
import { CollectionIcon } from "app/icons/collection-icon";

export interface MenuPanelSectionProps {
  type: "data-collections" | "labs";
  items: DataCollection[] | LabsCategory[];
  selected: DataCollection | LabsCategory;
  handleSelectItem: (item: DataCollection | LabsCategory) => void;
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
    () => (type === "data-collections" ? "Data Collections" : "Laboratories"),
    [type]
  );

  const sectionAddText = React.useMemo(
    () =>
      type === "data-collections"
        ? "+ New data collection"
        : "+ New laboratory",
    [type]
  );

  const sectionIcon = React.useMemo(
    () =>
      type === "data-collections" ? (
        <CollectionIcon
          width={16}
          height={16}
          className={homeStyles.sectionIcon}
        />
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
