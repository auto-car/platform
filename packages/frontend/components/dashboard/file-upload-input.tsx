import React from "react";
import styles from "./dashboard-screen.module.css";
import { Code } from "@chakra-ui/react";
import { UploadDatasetFormProps } from "./upload-dataset-dialog";

interface FileUploadInputProps {
  handleFormChange: <T extends keyof UploadDatasetFormProps>(
    name: T,
    value: UploadDatasetFormProps[T]
  ) => void;
  uploadDatasetForm: UploadDatasetFormProps;
  fileType: keyof UploadDatasetFormProps["files"];
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  handleFormChange,
  uploadDatasetForm,
  fileType,
}) => {
  const label = React.useMemo(() => {
    switch (fileType) {
      case "barcodes":
        return <Code className={styles.fileUploadFileText}>barcodes.tsv</Code>;
      case "genes":
        return <Code className={styles.fileUploadFileText}>genes.tsv</Code>;
      case "matrix":
        return <Code className={styles.fileUploadFileText}>matrix.mtx</Code>;
    }
  }, [fileType]);

  return (
    <div className={styles.textInputContainer}>
      <p className={styles.textInputLabel}>Upload your {label} file</p>
      <input
        className={styles.textInput}
        type='file'
        onChange={(e) => {
          handleFormChange("files", {
            ...uploadDatasetForm.files,
            [fileType]: e.target.files ? e.target.files[0] : null,
          });
        }}
      />
    </div>
  );
};
