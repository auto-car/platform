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
        return (
          <>
            Upload your{" "}
            <Code
              style={{
                background: "var(--violet-300)",
                color: "var(--violet-200)",
                fontSize: "12px",
              }}
            >
              barcodes.tsv
            </Code>{" "}
            file
          </>
        );
      case "genes":
        return (
          <>
            Upload your{" "}
            <Code
              style={{
                background: "var(--violet-300)",
                color: "var(--violet-200)",
                fontSize: "12px",
              }}
            >
              genes.tsv
            </Code>{" "}
            file
          </>
        );
      case "matrix":
        return (
          <>
            Upload your{" "}
            <Code
              style={{
                background: "var(--violet-300)",
                color: "var(--violet-200)",
                fontSize: "12px",
              }}
            >
              matrix.mtx
            </Code>{" "}
            file
          </>
        );
    }
  }, [fileType]);

  return (
    <div
      style={{
        minWidth: "calc(50% - 8px)",
        maxWidth: "calc(50% - 8px)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: 400,
          gap: "4px",
          color: "var(--violet-100-meta)",
        }}
      >
        {label}
      </p>
      <input
        style={{
          padding: "16px 12px",
          background: "var(--violet-500)",
          border: "none",
          outline: "none",
          fontSize: "12px",
          color: "var(--violet-100-placeholder)",
          borderRadius: "4px",
          minWidth: "calc(100% - 28px)",
          maxWidth: "calc(100% - 28px)",
        }}
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
