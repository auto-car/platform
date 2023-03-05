import React from "react";
import homeStyles from "../styles/home.module.css";
import { SearchIcon } from "../icons/search-icon";
import { CardViewIcon } from "../icons/card-view-icon";
import { ListViewIcon } from "../icons/list-view-icon";
import { FilterRowViewToggle } from "../components/filter-row-view-toggle";
import { LabsIcon } from "app/icons/labs-icon";
import { type LabsCategory } from "../utils/constants";
import { LabsCardView } from "app/components/labs-card-view";

interface LabViewRendererProps {
  labCategory: LabsCategory;
}

export const LabsViewRenderer: React.FC<LabViewRendererProps> = ({
  labCategory,
}) => {
  console.log({ lab: labCategory });
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
        <h1 className={homeStyles.homePanelHeading}>{labCategory.name}</h1>
        <span className={homeStyles.homePanelMetadataDate}>
          {labCategory.description}
        </span>
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
            <LabsCardView labs={labCategory.labs} />
          ) : (
            <pre>
              {JSON.stringify(
                { ...labCategory.labs, message: "TODO" },
                null,
                2
              )}
            </pre>
          )}
          <button className={homeStyles.addContentButton}>
            <LabsIcon width={16} height={16} />
            Add new Laboratory
          </button>
        </div>
      </section>
    </>
  );
};
