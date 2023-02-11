import React from "react";
import Image from "next/image";
import { LoadingDialog } from "../../components/dashboard/loading-dialog";

interface UMAPAnalysisPanelProps {
  lBSelectedDataset: string | null;
  lBLoadingDatasetUMAP: boolean;
  lBDatasetUmapURL: string;
}
export const UMAPAnalysisPanel: React.FC<UMAPAnalysisPanelProps> = ({
  lBDatasetUmapURL,
  lBLoadingDatasetUMAP,
  lBSelectedDataset,
}) => {
  return (
    <div
      style={{
        background: "var(--violet-400)",
        borderRadius: "8px",
        width: "1250px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "calc(100% - 48px)",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <hgroup style={{ color: "var(--violet-100)" }}>
          <h3>Analysis</h3>
          <p style={{ fontSize: "12px" }}>
            Collaboratively view, annotate your dataset&apos;s UMAP diagram.
          </p>
        </hgroup>
        <div>
          {lBSelectedDataset === null ? (
            <p
              style={{
                fontSize: "12px",
                color: "var(--violet-200)",
                opacity: 0.8,
              }}
            >
              Select or upload a dataset on the left menu to get started!
            </p>
          ) : lBLoadingDatasetUMAP ? (
            <LoadingDialog
              isOpen={lBLoadingDatasetUMAP}
              title='Generating your UMAP'
              expectedTime={5}
            />
          ) : lBDatasetUmapURL !== "" ? (
            <Image
              src={lBDatasetUmapURL}
              width={900}
              height={562.5}
              style={{
                objectFit: "contain",
                width: "900px",
                height: "100%",
                pointerEvents: "none",
              }}
              alt='UMAP Image'
            />
          ) : (
            <>Something went wrong :{"("}</>
          )}
        </div>
      </div>
    </div>
  );
};
