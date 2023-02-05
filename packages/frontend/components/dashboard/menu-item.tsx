import React, { ReactElement } from "react";
import styles from "./dashboard-screen.module.css";
import { MenuType } from "./types";

interface MenuItemProps {
  label: string;
  type: MenuType;
  icon: ReactElement;
  handleSelection: (type: MenuType) => void;
  isSelected: boolean;
}
export const MenuItem: React.FC<MenuItemProps> = ({
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
export const MenuItemNarrow: React.FC<MenuItemProps> = ({
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
