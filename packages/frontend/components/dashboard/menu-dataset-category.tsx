import React from "react";
import { Dataset } from "@platform/model";
import { getTimeAgo } from "components/rooms/room-card";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h4 style={{ fontWeight: 600 }}>{name}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "12px",
        }}
      >
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

  return (
    <button
      style={{
        border: "none",
        outline: "none",
        width: "100%",
        padding: "12px 12px",
        color: "var(--violet-100)",
        background: "var(--violet-300)",
        borderRadius: "4px",
        textAlign: "left",
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={handleSelectDataset}
    >
      <hgroup>
        <p style={{ fontWeight: 600, fontSize: "14px" }}>{datasetName}</p>
        <span style={{ color: "var(--violet-100-meta)" }}>
          Updated {getTimeAgo(new Date(updatedAt[0]))}
        </span>
      </hgroup>
      <span>
        <ChevronRightIcon color='var(--violet-100)' width={4} height={4} />
      </span>
    </button>
  );
};
