import React from "react";
import { useMutation, useStorage } from "../liveblocks.config";
import { type LiveList } from "@liveblocks/client";
import { Avatar } from "./avatar";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/cloudflare";
import { auth } from "app/utils/auth.server";
import { DeleteIcon } from "app/icons/delete-icon";
import { getTimeAgo } from "app/utils/date";
import labStyles from "./lab.module.css";
import styles from "./lab-visualisation.module.css";
import { useTransformEffect } from "react-zoom-pan-pinch";

interface VisualisationProps {
  id: string;
  src: string;
  setIsAnnotating: React.Dispatch<React.SetStateAction<boolean>>;
  isPanningMode?: boolean;
}

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

interface Annotation {
  comment: string;
  x: number;
  y: number;
  user: { picture: string; name: string };
  commentedAt: string;
}

export const LabVisualisation: React.FC<VisualisationProps> = ({
  id,
  src,
  setIsAnnotating,
  isPanningMode = false,
}) => {
  const [currentZoom, setCurrentZoom] = React.useState(1);
  useTransformEffect(({ state }) => {
    setCurrentZoom(Number(state.scale.toFixed(1)));
  });

  const [annotationTempValue, setAnnotationTempValue] = React.useState("");
  const [showAnnotationEditor, setShowAnnotationEditor] = React.useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const { profile: user } = useLoaderData<typeof loader>();

  const annotations = useStorage((root) => root.annotations) as [
    {
      id: string;
      annotations: {
        x: number;
        y: number;
        comment: string;
        user: { name: string; picture: string };
        commentedAt: string;
      }[];
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

  const visualisationAnnotations = React.useMemo(
    () => getAnnotationsById(id),
    [id, getAnnotationsById]
  );

  const deleteAnnotation = useMutation(
    ({ storage }, id: string, { x, y, comment }) => {
      const mutableAnnotations = storage.get("annotations") as LiveList<{
        id: string;
        annotations: {
          x: number;
          y: number;
          comment: string;
          //   colour: string;
          user: { picture: string; name: string };
          commentedAt: string;
        }[];
      }>;

      if (mutableAnnotations) {
        const existingAnnotationsObj = getAnnotationsById(id);
        if (existingAnnotationsObj) {
          const oldEntry = existingAnnotationsObj;
          // Clear old entry
          mutableAnnotations.delete(mutableAnnotations.indexOf(oldEntry));
          // Remove the annotation entry
          const entryToKeep = {
            ...oldEntry,
            annotations: oldEntry.annotations.filter(
              (annotation) =>
                annotation.x !== x &&
                annotation.y !== y &&
                annotation.comment !== comment
            ),
          };

          // Add to annotations state
          mutableAnnotations.push(entryToKeep);
        }
      }
    },
    [annotations]
  );

  const updateAnnotations = useMutation(
    (
      { storage },
      id: string,
      { comment, x, y, user, commentedAt }: Annotation
    ) => {
      const mutableAnnotations = storage.get("annotations") as LiveList<{
        id: string;
        annotations: {
          x: number;
          y: number;
          comment: string;
          user: { picture: string; name: string };
          commentedAt: string;
        }[];
      }>;

      if (mutableAnnotations) {
        const existingAnnotationsObj = getAnnotationsById(id);
        if (existingAnnotationsObj) {
          const oldEntry = existingAnnotationsObj;
          // Clear old entry
          mutableAnnotations.delete(mutableAnnotations.indexOf(oldEntry));
          // Add new annotation entry
          oldEntry.annotations.push({ x, y, comment, user, commentedAt });
          // Add to annotations state
          mutableAnnotations.push(oldEntry);
        } else {
          const newEntry = {
            annotations: [{ x, y, comment, user, commentedAt }],
            id,
          };
          mutableAnnotations.push(newEntry);
        }
      }
    },
    [annotations]
  );

  React.useEffect(() => {
    setIsAnnotating(showAnnotationEditor.isOpen);
  }, [showAnnotationEditor, setIsAnnotating]);

  return (
    <div style={{ position: "relative" }}>
      <button
        className={labStyles.boardWidgetImageWrapper}
        style={{ cursor: isPanningMode ? "inherit" : "pointer" }}
        onClick={(e) => {
          if (isPanningMode) {
            return;
          }
          const imageElement = document.getElementById(id);
          if (imageElement) {
            const bounds = imageElement.getBoundingClientRect();
            if (showAnnotationEditor.isOpen) {
              setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
            } else {
              setShowAnnotationEditor({
                isOpen: true,
                x:
                  Math.round(Math.abs(e.clientX - bounds.x)) /
                  (bounds.width * currentZoom),
                y:
                  Math.round(Math.abs(e.clientY - bounds.y)) /
                  (bounds.height * currentZoom),
              });
            }
            setAnnotationTempValue("");
          }
        }}
      >
        <img
          src={src}
          className={labStyles.boardWidgetImage}
          alt='UMAP'
          id={id}
        />
      </button>
      {showAnnotationEditor.isOpen ? (
        <EditAnnotation
          showAnnotationEditor={showAnnotationEditor}
          user={user}
          annotationTempValue={annotationTempValue}
          setAnnotationTempValue={setAnnotationTempValue}
          id={id}
          updateAnnotations={updateAnnotations}
          setShowAnnotationEditor={setShowAnnotationEditor}
        />
      ) : null}
      {visualisationAnnotations
        ? visualisationAnnotations.annotations.map((annotation, index) => (
            <DisplayAnnotation
              key={index}
              annotation={annotation}
              id={id}
              deleteAnnotation={deleteAnnotation}
            />
          ))
        : null}
    </div>
  );
};

interface DisplayAnnotationProps {
  annotation: Annotation;
  deleteAnnotation: (args_0: string, args_1: any) => void;
  id: string;
}

const DisplayAnnotation: React.FC<DisplayAnnotationProps> = ({
  annotation,
  deleteAnnotation,
  id,
}) => {
  const [showDetailed, setShowDetailed] = React.useState(false);
  return (
    <div
      className={styles.displayAnnotation}
      style={{
        alignItems: showDetailed ? "flex-start" : "center",
        top: annotation.y,
        left: annotation.x,
      }}
      onPointerOver={() => setShowDetailed(true)}
      onPointerLeave={() => setShowDetailed(false)}
    >
      <Avatar src={annotation.user.picture} size='small' />
      <div className={styles.displayAnnotationContent}>
        {showDetailed ? (
          <div className={styles.displayAnnotationContentHeader}>
            <p className={styles.contentHeaderUserName}>
              {annotation.user.name}
            </p>
            <span className={styles.contentHeaderAddedAt}>
              Added {getTimeAgo(new Date(parseInt(annotation.commentedAt)))}
            </span>
          </div>
        ) : null}
        <p className={styles.annotationComment}>{annotation.comment}</p>
        {showDetailed ? (
          <button
            className={styles.annotationDeleteButton}
            onClick={() => {
              deleteAnnotation(id, { ...annotation });
            }}
          >
            <DeleteIcon width={12} height={12} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

interface EditAnnotationProps {
  showAnnotationEditor: { isOpen: boolean; x: number; y: number };
  user: {
    _json?:
      | {
          given_name?: string | undefined;
          picture?: string | undefined;
        }
      | undefined;
  };
  annotationTempValue: string;
  setAnnotationTempValue: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  updateAnnotations: (args_0: string, args_1: Annotation) => void;
  setShowAnnotationEditor: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; x: number; y: number }>
  >;
}

const EditAnnotation: React.FC<EditAnnotationProps> = ({
  setAnnotationTempValue,
  annotationTempValue,
  id,
  setShowAnnotationEditor,
  showAnnotationEditor,
  updateAnnotations,
  user,
}) => {
  const imageElement = document.getElementById(id);
  if (imageElement) {
    const bounds = imageElement.getBoundingClientRect();
    return (
      <div
        className={styles.editAnnotation}
        style={{
          left: showAnnotationEditor.x * bounds.width,
          top: showAnnotationEditor.y * bounds.height,
        }}
      >
        <Avatar src={user._json?.picture || ""} size='small' />
        <input
          className={styles.editAnnotationInput}
          value={annotationTempValue}
          onChange={(e) => setAnnotationTempValue(e.target.value)}
          placeholder='Enter annotation...'
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // const userBg =
              //   document.documentElement.style.getPropertyValue("--user-bg");
              const imageElement = document.getElementById(id);
              if (imageElement) {
                const bounds = imageElement.getBoundingClientRect();
                updateAnnotations(id, {
                  comment: annotationTempValue,
                  x: showAnnotationEditor.x * bounds.width,
                  y: showAnnotationEditor.y * bounds.height,
                  user: {
                    name: user._json?.given_name || "",
                    picture: user._json?.picture || "",
                  },
                  commentedAt: String(Date.now()),
                });
                setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
                setAnnotationTempValue("");
              }
            } else if (e.key === "Escape") {
              setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
            }
          }}
        />
      </div>
    );
  }
  return null;
};
