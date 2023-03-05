import React from "react";
import homeStyles from "../styles/home.module.css";
import { AvatarGroup } from "../components/avatar-group";
import { SearchIcon } from "../icons/search-icon";
import { CardViewIcon } from "../icons/card-view-icon";
import { ListViewIcon } from "../icons/list-view-icon";
import { FilterRowViewToggle } from "../components/filter-row-view-toggle";
import { getTimeAgo } from "../utils/date";
import { DatasetsCardView } from "../components/datasets-card-view";
import { UploadIcon } from "app/icons/upload-icon";
import { type Team } from "../utils/constants";

interface TeamViewRendererProps {
  team: Team;
}

export const TeamViewRenderer: React.FC<TeamViewRendererProps> = ({ team }) => {
  const [selectedView, setSelectedView] = React.useState<"list" | "card">(
    "card"
  );

  const handleSelectView = React.useCallback(
    (view: "list" | "card") => setSelectedView(view),
    []
  );

  return (
    <>
      <hgroup className={homeStyles.homePanelHgroup}>
        <h1 className={homeStyles.homePanelHeading}>{team.name}</h1>
        <div className={homeStyles.homePanelMetadata}>
          <span className={homeStyles.homePanelMetadataDate}>
            Updated {getTimeAgo(team.updatedAt)}
          </span>
          <AvatarGroup
            avatars={team.members.map((member) => ({
              src: member.picture,
            }))}
          />
        </div>
      </hgroup>
      <section className={homeStyles.homePanelContent}>
        <div className={homeStyles.contentHeader}>
          <h2 className={homeStyles.contentSubheading}>Datasets</h2>
          <div className={homeStyles.contentFilterRow}>
            <div className={homeStyles.filterRowSearchAndSort}>
              <div className={homeStyles.filterSearchbar}>
                <SearchIcon
                  width={14}
                  height={14}
                  className={homeStyles.filterSearchbarIcon}
                />
                <input
                  className={homeStyles.filterSearchbarInput}
                  placeholder='Search'
                />
              </div>
              <div className={homeStyles.filterSort}>
                <p className={homeStyles.filterSortText}>Sort by:</p>
                <select className={homeStyles.filterSortDropdown}>
                  <option>Updated Time</option>
                </select>
              </div>
            </div>
            <div className={homeStyles.filterRowViewToggles}>
              <FilterRowViewToggle
                icon={<ListViewIcon width={16} height={16} />}
                type='list'
                isSelected={selectedView === "list"}
                onClick={() => handleSelectView("list")}
              />
              <FilterRowViewToggle
                icon={<CardViewIcon width={16} height={16} />}
                type='card'
                isSelected={selectedView === "card"}
                onClick={() => handleSelectView("card")}
              />
            </div>
          </div>
        </div>
        <div className={homeStyles.contentView}>
          {selectedView === "card" ? (
            <DatasetsCardView datasets={team.datasets} />
          ) : (
            <pre>
              {JSON.stringify({ ...team.datasets, message: "TODO" }, null, 2)}
            </pre>
          )}
          <button className={homeStyles.addContentButton}>
            <UploadIcon width={16} height={16} />
            Add new Dataset
          </button>
        </div>
      </section>
    </>
  );
};