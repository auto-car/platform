import React from "react";
import styles from "./dashboard-screen.module.css";
import dialogStyles from "./upload-dataset-dialog.module.css";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormSection } from "components/rooms/form-section";
import Creatable from "react-select/creatable";
import { LoadingDialog } from "./loading-dialog";
import { FileUploadInput } from "./file-upload-input";
import { DatasetOption } from "../../screens/dashboard/dashboard-screen";

interface UploadDatasetDialogProps {
  onOpen: VoidFunction;
  onClose: VoidFunction;
  isOpen: boolean;
  triggerReload: VoidFunction;
  datasetCategories: DatasetOption[];
}

export interface UploadDatasetFormProps {
  datasetName: string;
  datasetCategory: string;
  files: {
    barcodes: File | null;
    genes: File | null;
    matrix: File | null;
  };
}

export const UploadDatasetDialog: React.FC<UploadDatasetDialogProps> = ({
  onClose,
  onOpen,
  isOpen,
  triggerReload,
  datasetCategories,
}) => {
  const emptyFormState = React.useMemo(
    () => ({
      datasetName: "",
      datasetCategory: "",
      files: { barcodes: null, genes: null, matrix: null },
    }),
    []
  );

  const [isUploading, setIsUploading] = React.useState(false);

  const [uploadDatasetForm, setUploadDatasetForm] =
    React.useState<UploadDatasetFormProps>(emptyFormState);

  const handleFormChange = React.useCallback(
    <T extends keyof UploadDatasetFormProps>(
      name: T,
      value: UploadDatasetFormProps[T]
    ) => {
      setUploadDatasetForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = React.useCallback(async () => {
    setIsUploading(true);
    try {
      const files = uploadDatasetForm.files;
      const barcodeFile = files.barcodes;
      const genesFile = files.genes;
      const matrixFile = files.matrix;

      if (!barcodeFile || !genesFile || !matrixFile) {
        alert("You are missing a file in your upload. Please try again.");
        setIsUploading(false);
        return;
      }
      const bodyForUpload = new FormData();
      bodyForUpload.append("files", barcodeFile, barcodeFile.name);
      bodyForUpload.append("files", genesFile, genesFile.name);
      bodyForUpload.append("files", matrixFile, matrixFile.name);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYSIS_WORKER_URL}/upload?datasetName=${uploadDatasetForm.datasetName}&datasetCategory=${uploadDatasetForm.datasetCategory}`,
        {
          method: "POST",
          body: bodyForUpload,
        }
      );
      const text = await response.text();
      if (response.status === 200) {
        triggerReload();
        setUploadDatasetForm(emptyFormState);
        onClose();
      } else {
        console.error(text);
      }
    } catch (e) {
      console.error(e as Error);
    }
    setIsUploading(false);
  }, [uploadDatasetForm, triggerReload, emptyFormState, onClose]);

  return (
    <>
      {isUploading ? (
        <LoadingDialog
          isOpen={isUploading}
          title='Uploading your data'
          expectedTime={2}
        />
      ) : null}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={dialogStyles.modalContent} maxWidth='unset'>
          <ModalHeader>
            <h3>Upload a new dataset</h3>
          </ModalHeader>
          <ModalBody className={dialogStyles.modalBody}>
            <FormSection>
              <p className={dialogStyles.formInputTitle}>Dataset Category</p>
              <Creatable
                unstyled
                options={datasetCategories}
                isClearable
                onChange={(newSelection) => {
                  if (newSelection) {
                    handleFormChange("datasetCategory", newSelection.value);
                  }
                }}
                styles={{
                  container: (baseStyles) => ({
                    ...baseStyles,
                    border: "none",
                    borderRadius: "4px",
                    outline: "none",
                  }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    background: "var(--violet-500)",
                    border: "none",
                    outline: "none",
                    margin: "0px",
                    padding: "13px",
                    fontSize: "12px",
                    fontWeight: 400,
                    borderRadius: "4px",
                    minHeight: "unset",
                    boxShadow: "unset",
                  }),
                  loadingIndicator: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    margin: 0,
                  }),
                  dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                  }),
                  clearIndicator: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    cursor: "pointer",
                    margin: 0,
                  }),
                  indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    margin: 0,
                    width: "1px",
                    background: "var(--violet-200)",
                  }),
                  indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--violet-100)",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: 0,
                    color: "var(--violet-100)",
                    margin: 0,
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--violet-100)",
                    fontSize: "12px",
                    fontFamily: "Rubik",
                    fontWeight: 400,
                    padding: 0,
                    margin: 0,
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--violet-100-placeholder)",
                    opacity: 1,
                    padding: 0,
                    margin: 0,
                  }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--violet-100)",
                    background: "var(--violet-500)",
                    borderRadius: "4px",
                    padding: "8px 0px",
                  }),
                  noOptionsMessage: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--violet-100)",
                    fontSize: "12px",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    boxShadow: "0px 0px 20px var(--violet-300)",
                    borderRadius: "4px",
                  }),
                  option: (baseStyles, props) => ({
                    ...baseStyles,
                    color: "var(--violet-100)",
                    background: props.isFocused
                      ? "var(--violet-300)"
                      : "var(--violet-500)",
                    fontSize: "12px",
                    fontFamily: "Rubik",
                    padding: "8px 12px",
                    fontWeight: 400,
                    cursor: "pointer",
                  }),
                }}
                placeholder='Select existing category or enter a new one...'
              />
            </FormSection>
            <FormSection>
              <p className={dialogStyles.formInputTitle}>Dataset Name</p>
              <input
                className={dialogStyles.formTextInput}
                value={uploadDatasetForm.datasetName}
                onChange={(e) =>
                  handleFormChange("datasetName", e.target.value)
                }
                placeholder='Enter dataset name...'
              />
            </FormSection>
            <FormSection>
              <p className={dialogStyles.formInputTitle}>Files</p>
              <div className={dialogStyles.formFilesInputContainer}>
                <FileUploadInput
                  handleFormChange={handleFormChange}
                  uploadDatasetForm={uploadDatasetForm}
                  fileType={"barcodes"}
                />
                <FileUploadInput
                  handleFormChange={handleFormChange}
                  uploadDatasetForm={uploadDatasetForm}
                  fileType={"genes"}
                />
                <FileUploadInput
                  handleFormChange={handleFormChange}
                  uploadDatasetForm={uploadDatasetForm}
                  fileType={"matrix"}
                />
              </div>
            </FormSection>
          </ModalBody>
          <ModalFooter className={dialogStyles.modalFooter}>
            <button
              className={dialogStyles.modalCancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={dialogStyles.modalSubmitButton}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
