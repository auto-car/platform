import React from "react";
import styles from "./dashboard-screen.module.css";
import { UploadIcon } from "icons/upload-icon";
import { useDisclosure } from "@chakra-ui/react";
import { UploadDatasetDialog } from "./upload-dataset-dialog";
import { DatasetOption } from "../../screens/dashboard/dashboard-screen";

export const UploadDatasetButton = ({
  triggerReload,
  datasetCategories,
}: {
  triggerReload: VoidFunction;
  datasetCategories: DatasetOption[];
}) => {
  const uploadDisclosure = useDisclosure();

  return (
    <>
      <UploadDatasetDialog
        {...uploadDisclosure}
        datasetCategories={datasetCategories}
        triggerReload={triggerReload}
      />
      <button className={styles.uploadButton} onClick={uploadDisclosure.onOpen}>
        <UploadIcon width={20} height={20} className={styles.shareIcon} />
        <p style={{ fontSize: "12px", fontWeight: 500 }}>Upload New Dataset</p>
      </button>
    </>
  );
};
