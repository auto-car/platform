import React from "react";
import { Dataset } from "@platform/model";
import { getTimeAgo } from "components/rooms/room-card";
import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "./dashboard-screen.module.css";

interface MenuDatasetCategoryProps {
  name: string;
  items: Dataset[];
  handleSelectDataset: (category: string, dataset: Dataset) => void;
}

export const MenuDatasetCategory: React.FC<MenuDatasetCategoryProps> = ({
  items,
  name,
  handleSelectDataset,
}) => {
  return (
    <section className={styles.menuDatasetCategory}>
      <h4 className={styles.menuDatasetCategoryName}>{name}</h4>
      <div className={styles.menuDatasetCategoryItems}>
        {items.map((item) => (
          <DatasetMenuItem
            {...item}
            key={item.name[0]}
            handleSelectDataset={() => handleSelectDataset(name, item)}
          />
        ))}
      </div>
    </section>
  );
};

const DatasetMenuItem: React.FC<
  Dataset & { handleSelectDataset: VoidFunction }
> = ({ name, createdAt, hasOutput, updatedAt, handleSelectDataset }) => {
  const datasetName = React.useMemo(() => name[0].split("/")[1], [name]);

  const updatedToLocalTime = React.useMemo(
    () => convertUTCDateToLocalDate(new Date(updatedAt[0])),
    [updatedAt]
  );

  return (
    <button
      className={styles.datasetCategoryItem}
      onClick={handleSelectDataset}
    >
      <hgroup>
        <p className={styles.datasetCategoryItemName}>{datasetName}</p>
        <span className={styles.updatedAtText}>
          Updated {getTimeAgo(updatedToLocalTime)}
        </span>
      </hgroup>
      <span>
        <ChevronRightIcon color='var(--violet-100)' width={4} height={4} />
      </span>
    </button>
  );
};

const convertUTCDateToLocalDate = (date: Date) => {
  var newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return newDate;
};
