import React from "react";
import { LogoIcon } from "app/icons/logo";
import homeStyles from "../styles/home.module.css";
import { MenuPanelSection } from "./menu-panel-section";
import {
  type LabsCategory,
  mockMenu,
  type DataCollection,
} from "../utils/constants";
import { useNavigate } from "@remix-run/react";
import { BackIcon } from "app/icons/back-icon";

interface MenuPanelProps {
  team: string;
  selected: DataCollection | LabsCategory;
  handleSelectItem: (item: DataCollection | LabsCategory) => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  team,
  selected,
  handleSelectItem,
}) => {
  const navigate = useNavigate();
  const backToTeams = React.useCallback(() => navigate("/home"), [navigate]);

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
        <button className={homeStyles.backToTeamsButton} onClick={backToTeams}>
          <BackIcon width={4} />
          <p>Back to Teams</p>
        </button>
        <div className={homeStyles.menuPanelTeamSection}>
          <h5 className={homeStyles.menuPanelCurrentTeam}>{team}</h5>
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
      </div>
    </aside>
  );
};
