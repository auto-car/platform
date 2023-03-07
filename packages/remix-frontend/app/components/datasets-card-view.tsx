import { DeleteIcon } from "app/icons/delete-icon";
import { DownloadIcon } from "app/icons/download-icon";
import { UploadIcon } from "app/icons/upload-icon";
import { getTimeAgo } from "app/utils/date";
import styles from "./datasets-card-view.module.css";
import { type Dataset } from "@platform/model";
import { Avatar } from "./avatar";
import { PrevIcon } from "app/icons/prev-icon";
import { NextIcon } from "app/icons/next-icon";

interface DatasetsCardViewProps {
  datasets: Dataset[];
}

export const DatasetsCardView: React.FC<DatasetsCardViewProps> = ({
  datasets,
}) => {
  return (
    <div className={styles.cardView}>
      <div className={styles.cardViewGrid}>
        {datasets.slice(0, 12).map((dataset, key) => (
          <div key={key} className={styles.datasetCard}>
            <div className={styles.datasetCardContent}>
              <div className={styles.cardHeader}>
                <hgroup className={styles.cardHeaderHGroup}>
                  <h2 className={styles.cardHeading}>{dataset.name}</h2>
                  <span className={styles.updatedAt}>
                    Updated {getTimeAgo(new Date(dataset.updatedAt))}
                  </span>
                </hgroup>
                <Avatar src={dataset.createdBy.picture} size='small' />
              </div>
              <div className={styles.cardDatasetData}>
                <p className={styles.cardDatasetDataText}>
                  Total Files: {dataset.files.length}
                </p>
                <p className={styles.cardDatasetDataText}>
                  Total Size: {dataset.totalSize}mb
                </p>
              </div>
              <div className={styles.cardDatasetActions}>
                <button className={styles.cardDatasetAction}>
                  <UploadIcon width={14} height={16} />{" "}
                  {/* <span className={styles.cardDatasetActionText}>Update</span> */}
                </button>
                <button className={styles.cardDatasetAction}>
                  <DownloadIcon width={14} height={16} />
                  {/* <span className={styles.cardDatasetActionText}>Download</span> */}
                </button>
                <button className={styles.cardDatasetAction}>
                  <DeleteIcon width={10} height={16} />{" "}
                  {/* <span className={styles.cardDatasetActionText}>Delete</span> */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.paginationData}>
        <button className={styles.paginationButtonDisabled} disabled={true}>
          <PrevIcon width={16} height={16} />
          Prev
        </button>
        <span>
          Showing 1-{Math.min(12, datasets.length)} of {datasets.length}
        </span>
        <button className={styles.paginationButton}>
          Next
          <NextIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
};
