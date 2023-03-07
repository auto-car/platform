import React from "react";
import { DatasetCollection, Dataset } from "@platform/model";
import { UploadDatasetButton } from "../../components/dashboard/upload-datset-button";
import { MenuDatasetCategory } from "../../components/dashboard/menu-dataset-category";

interface DatasetsMenuProps {
  triggerReload: () => void;
  datasets: DatasetCollection[];
  handleSelectDataset: (category: string, dataset: Dataset) => void;
}

export const DatasetsMenu: React.FC<DatasetsMenuProps> = ({
  triggerReload,
  datasets,
  handleSelectDataset,
}) => {
  return (
    <aside
      style={{
        height: "700px",
        width: "320px",
        background: "var(--violet-400)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div
        style={{
          width: "calc(100% - 48px)",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <hgroup style={{ color: "var(--violet-100)" }}>
          <h3>Datasets</h3>
          <p style={{ fontSize: "12px" }}>
            Select up to 2 datasets to analyse.
          </p>
          <UploadDatasetButton
            triggerReload={triggerReload}
            datasetCategories={datasets.map((datasetCategory) => ({
              value: datasetCategory.category[0],
              label: datasetCategory.category[0],
            }))}
          />
        </hgroup>
        {datasets.map((datasetCategory) => (
          <MenuDatasetCategory
            key={datasetCategory.category[0]}
            items={datasetCategory.datasets}
            name={datasetCategory.category[0]}
            handleSelectDataset={handleSelectDataset}
          />
        ))}
      </div> */}
    </aside>
  );
};
