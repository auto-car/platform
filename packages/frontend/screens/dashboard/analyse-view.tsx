import React from "react";
import dashboardStyles from "./dashboard-screen.module.css";
import styles from "./analyse-view.module.css";
import { UploadIcon } from "../../icons/upload-icon";
import { useMutation, useStorage } from "../../liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import Image from "next/image";

export const AnalyseView = () => {
  const showGraph = (
    useStorage((root) => root.showGraph) as { showGraph: boolean }
  ).showGraph;

  const updateShowGraph = useMutation(({ storage }) => {
    const mutableShowGraph = storage.get("showGraph") as LiveObject<{
      showGraph: boolean;
    }>;
    if (mutableShowGraph) {
      mutableShowGraph.set("showGraph", true);
    }
  }, []);

  return (
    <div className={styles.mainBody}>
      <hgroup className={dashboardStyles.dashboardViewHGroup}>
        <h1 className={dashboardStyles.dashboardViewHeading}>Analyse</h1>
        <p className={dashboardStyles.dashboardViewDescription}>
          Analyse single or multiple datasets collaboratively.
        </p>
      </hgroup>
      <section className={styles.section}>
        <hgroup className={styles.sectionHGroup}>
          <h2 className={styles.sectionHeading}>Upload your data</h2>
          <p className={styles.sectionDescription}>
            To begin the analysis process, please upload your quality-controlled
            dataset file.
          </p>
        </hgroup>
        <button className={styles.uploadButton} onClick={updateShowGraph}>
          <UploadIcon width={24} height={24} className={styles.uploadIcon} />
          <p>Upload Data</p>
        </button>
      </section>
      {showGraph ? (
        <section className={styles.section}>
          <hgroup className={styles.sectionHGroup}>
            <h2 className={styles.sectionHeading}>Visualisation</h2>
            <p className={styles.sectionDescription}>
              To add an annotation, click on the visualisations below.
            </p>
          </hgroup>
          <div className={styles.visualisationRow}>
            {["mock-visualisation-1", "mock-visualisation-2"].map(
              (visualisationId, index) => (
                <Visualisation visualisationId={visualisationId} key={index} />
              )
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
};

interface VisualisationProps {
  visualisationId: string;
}

const Visualisation: React.FC<VisualisationProps> = ({ visualisationId }) => {
  const [annotationTempValue, setAnnotationTempValue] = React.useState("");
  const [showAnnotationEditor, setShowAnnotationEditor] = React.useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const annotations = useStorage((root) => root.annotations) as [
    {
      id: string;
      annotations: [{ x: number; y: number; comment: string; colour: string }];
    }
  ];

  const getAnnotationsById = React.useCallback(
    (id: string) => {
      if (annotations) {
        const filtered = annotations.filter(
          (annotation) => annotation.id === id
        );
        if (filtered.length > 0) return filtered[0];
      }
      return null;
    },
    [annotations]
  );

  const visualisationAnnotations = getAnnotationsById(visualisationId);

  const updateAnnotations = useMutation(
    (
      { storage },
      id: string,
      {
        comment,
        x,
        y,
        colour,
      }: { comment: string; x: number; y: number; colour: string }
    ) => {
      const mutableAnnotations = storage.get("annotations") as LiveList<{
        id: string;
        annotations: {
          x: number;
          y: number;
          comment: string;
          colour: string;
        }[];
      }>;

      if (mutableAnnotations) {
        const existingAnnotationsObj = getAnnotationsById(id);
        if (existingAnnotationsObj) {
          const oldEntry = existingAnnotationsObj;
          // Clear old entry
          mutableAnnotations.delete(mutableAnnotations.indexOf(oldEntry));
          // Add new annotation entry
          oldEntry.annotations.push({ x, y, comment, colour });
          // Add to annotations state
          mutableAnnotations.push(oldEntry);
        } else {
          const newEntry = { annotations: [{ x, y, comment, colour }], id };
          mutableAnnotations.push(newEntry);
        }
      }
    },
    [annotations]
  );

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={`/${visualisationId}.png`}
        alt=""
        width={700}
        height={500}
        className={styles.visualisation}
        onClick={(e) => {
          const imageElement = document.getElementById(visualisationId);
          if (imageElement) {
            const bounds = imageElement.getBoundingClientRect();
            setShowAnnotationEditor({
              isOpen: true,
              x: Math.round(e.clientX - bounds.x) / bounds.width,
              y: Math.round(e.clientY - bounds.y) / bounds.height,
            });
            setAnnotationTempValue("");
          }
        }}
        id={visualisationId}
      />
      {showAnnotationEditor.isOpen ? (
        <div
          style={{
            position: "absolute",
            left: showAnnotationEditor.x * 700,
            top: showAnnotationEditor.y * 500,
            background: "var(--user-bg)",
            width: "180px",
            borderRadius: "6px",
            transformOrigin: "bottom left",
            opacity: 0.95,
          }}
        >
          <input
            style={{
              background: "none",
              border: "none",
              outline: "none",
              padding: "8px 12px",
              fontSize: "12px",
              color: "var(--user-text)",
            }}
            value={annotationTempValue}
            onChange={(e) => setAnnotationTempValue(e.target.value)}
            placeholder="Enter annotation..."
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const userBg =
                  document.documentElement.style.getPropertyValue("--user-bg");
                updateAnnotations(visualisationId, {
                  comment: annotationTempValue,
                  x: showAnnotationEditor.x,
                  y: showAnnotationEditor.y,
                  colour: userBg.split("--")[1].split("-")[0],
                });
                setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
                setAnnotationTempValue("");
              }
            }}
          />
        </div>
      ) : null}
      {visualisationAnnotations
        ? visualisationAnnotations.annotations.map((annotation, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                padding: "8px 12px",
                background: `var(--${annotation.colour}-400)`,
                color: `var(--${annotation.colour}-100)`,
                left: annotation.x * 700,
                top: annotation.y * 500,
                borderRadius: "0px 6px 6px 6px",
              }}
            >
              <p style={{ fontSize: 12 }}>{annotation.comment}</p>
            </div>
          ))
        : null}
    </div>
  );
};
