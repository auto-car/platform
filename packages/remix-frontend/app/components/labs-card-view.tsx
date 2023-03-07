import React from "react";
import { getTimeAgo } from "../utils/date";
import datasetsStyles from "./datasets-card-view.module.css";
import labsStyles from "./labs-card-view.module.css";
import { PrevIcon } from "../icons/prev-icon";
import { NextIcon } from "../icons/next-icon";
import { type LaboratoryProps } from "../utils/constants";
import { AvatarGroup } from "./avatar-group";

interface LabsCardViewProps {
  labs: LaboratoryProps[];
  goToLab: (labId: string) => void;
}

export const LabsCardView: React.FC<LabsCardViewProps> = ({
  labs,
  goToLab,
}) => {
  return (
    <div className={datasetsStyles.cardView}>
      <div className={datasetsStyles.cardViewGrid}>
        {labs.slice(0, 12).map((lab, key) => (
          <LabCard key={key} lab={lab} goToLab={goToLab} />
        ))}
      </div>
      <div className={datasetsStyles.paginationData}>
        <button
          className={datasetsStyles.paginationButtonDisabled}
          disabled={true}
        >
          <PrevIcon width={16} height={16} />
          Prev
        </button>
        <span>
          Showing 1-{Math.min(12, labs.length)} of {labs.length}
        </span>
        <button className={datasetsStyles.paginationButton}>
          Next
          <NextIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

const LabCard = ({
  lab,
  goToLab,
}: {
  lab: LaboratoryProps;
  goToLab: (labId: string) => void;
}) => {
  return (
    <button className={labsStyles.labCard} onClick={() => goToLab(lab.id)}>
      <div className={datasetsStyles.datasetCardContent}>
        <div className={datasetsStyles.cardHeader}>
          <hgroup className={datasetsStyles.cardHeaderHGroup}>
            <h2 className={datasetsStyles.cardHeading}>{lab.name}</h2>
            <span className={datasetsStyles.updatedAt}>
              Updated {getTimeAgo(lab.updatedAt)}
            </span>
          </hgroup>
          <AvatarGroup
            avatars={lab.members.map((member) => ({
              src: member.picture,
            }))}
            showText={false}
          />
        </div>
        <div className={datasetsStyles.cardDatasetData}>
          <p className={datasetsStyles.cardDatasetDataText}>
            {lab.description}
          </p>
        </div>
      </div>
    </button>
  );
};
