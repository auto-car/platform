import React from "react";
import { LogoIcon } from "app/icons/logo";
import homeStyles from "../styles/home.module.css";
import { MenuPanelSection } from "./menu-panel-section";
import { type LabsCategory, mockMenu, type Team } from "../utils/constants";

interface MenuPanelProps {
  selected: Team | LabsCategory;
  handleSelectItem: (item: Team | LabsCategory) => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  selected,
  handleSelectItem,
}) => {
  return (
    <aside className={homeStyles.menuPanel}>
      <div className={homeStyles.menuPanelContent}>
        <div className={homeStyles.menuPanelLogoHeader}>
          <LogoIcon
            width={16}
            height={16}
            className={homeStyles.menuPanelLogo}
          />
          <h3 className={homeStyles.menuPanelLogoHeaderTitle}>AutoCAR</h3>
        </div>
        <div className={homeStyles.menuPanelSections}>
          {mockMenu.map((section, key) => (
            <MenuPanelSection
              key={key}
              {...section}
              selected={selected}
              handleSelectItem={handleSelectItem}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
