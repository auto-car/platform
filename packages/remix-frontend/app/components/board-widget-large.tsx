import React from "react";
import styles from "./lab.module.css";
import { getTimeAgo } from "app/utils/date";
import placeholderImage from "../images/home-umap.png";
import { LabVisualisation } from "app/components/lab-visualisation";

interface BoardWidgetLargeProps {
  id: string;
  isPanningMode: boolean;
  setIsAnnotating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardWidgetLarge: React.FC<BoardWidgetLargeProps> = ({
  id,
  isPanningMode,
  setIsAnnotating,
}) => {
  return (
    <div className={styles.boardWidgetLarge}>
      <hgroup className={styles.boardWidgetHGroup}>
        <h3 className={styles.boardWidgetHeading}>
          UMAP: AbseqRNA_MolsPerCell
        </h3>
        <p className={styles.boardWidgetUpdatedAt}>
          Updated {getTimeAgo(new Date(Date.now() - 1123123))}
        </p>
      </hgroup>
      <div className={styles.boardWidgetImageWrapper}>
        <LabVisualisation
          id={id}
          src={placeholderImage}
          isPanningMode={isPanningMode}
          setIsAnnotating={setIsAnnotating}
        />
      </div>
    </div>
  );
};
