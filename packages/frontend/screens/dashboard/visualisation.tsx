import React from "react";
import { useMutation, useStorage } from "../../liveblocks.config";
import { LiveList } from "@liveblocks/client";
import Image from "next/image";
import { UserContext } from "../../context/user-context";
import { UserAvatar } from "components/avatar/user-avatar";
import { getTimeAgo } from "components/rooms/room-card";
import { DeleteIcon } from "@chakra-ui/icons";

interface VisualisationProps {
  lBDatasetUmapURL: string;
}

export const Visualisation: React.FC<VisualisationProps> = ({
  lBDatasetUmapURL,
}) => {
  const [annotationTempValue, setAnnotationTempValue] = React.useState("");
  const [showAnnotationEditor, setShowAnnotationEditor] = React.useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const { user } = React.useContext(UserContext);

  const annotations = useStorage((root) => root.annotations) as [
    {
      id: string;
      annotations: [
        {
          x: number;
          y: number;
          comment: string;
          colour: string;
          user: { name: string; picture: string };
          commentedAt: string;
        }
      ];
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

  const visualisationAnnotations = getAnnotationsById(lBDatasetUmapURL);

  const deleteAnnotation = useMutation(
    ({ storage }, id: string, { x, y, comment }) => {
      const mutableAnnotations = storage.get("annotations") as LiveList<{
        id: string;
        annotations: {
          x: number;
          y: number;
          comment: string;
          colour: string;
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
      {
        comment,
        x,
        y,
        colour,
        user,
        commentedAt,
      }: {
        comment: string;
        x: number;
        y: number;
        colour: string;
        user: { picture: string; name: string };
        commentedAt: string;
      }
    ) => {
      const mutableAnnotations = storage.get("annotations") as LiveList<{
        id: string;
        annotations: {
          x: number;
          y: number;
          comment: string;
          colour: string;
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
          oldEntry.annotations.push({
            x,
            y,
            comment,
            colour,
            user,
            commentedAt,
          });
          // Add to annotations state
          mutableAnnotations.push(oldEntry);
        } else {
          const newEntry = {
            annotations: [{ x, y, comment, colour, user, commentedAt }],
            id,
          };
          mutableAnnotations.push(newEntry);
        }
      }
    },
    [annotations]
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          outline: "none",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
        onClick={(e) => {
          const imageElement = document.getElementById(lBDatasetUmapURL);
          if (imageElement) {
            const bounds = imageElement.getBoundingClientRect();
            if (showAnnotationEditor.isOpen) {
              setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
            } else {
              setShowAnnotationEditor({
                isOpen: true,
                x: Math.round(e.clientX - bounds.x) / 900,
                y: Math.round(e.clientY - bounds.y) / 562,
              });
            }
            setAnnotationTempValue("");
          }
        }}
      >
        <Image
          src={lBDatasetUmapURL}
          width={900}
          height={562}
          style={{
            objectFit: "contain",
            width: "900px",
            height: "100%",
            cursor: "pointer",
            position: "relative",
            borderRadius: "2px",
          }}
          alt='UMAP Image'
          id={lBDatasetUmapURL}
        />
      </button>
      {showAnnotationEditor.isOpen ? (
        <div
          style={{
            position: "absolute",
            left: showAnnotationEditor.x * 900,
            top: showAnnotationEditor.y * 562,
            background: "var(--user-bg)",
            width: "180px",
            borderRadius: "0px 6px 6px 6px",
            transformOrigin: "bottom left",
            zIndex: 10000000000,
            padding: "8px 12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UserAvatar name={user.name} src={user.picture} size='tiny' />
          <input
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "12px",
              color: "var(--user-text)",
              maxHeight: "12px",
              padding: 0,
            }}
            value={annotationTempValue}
            onChange={(e) => setAnnotationTempValue(e.target.value)}
            placeholder='Enter annotation...'
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const userBg =
                  document.documentElement.style.getPropertyValue("--user-bg");
                updateAnnotations(lBDatasetUmapURL, {
                  comment: annotationTempValue,
                  x: showAnnotationEditor.x,
                  y: showAnnotationEditor.y,
                  colour: userBg.split("--")[1].split("-")[0],
                  user,
                  commentedAt: String(Date.now()),
                });
                setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
                setAnnotationTempValue("");
              } else if (e.key === "Escape") {
                setShowAnnotationEditor({ isOpen: false, x: 0, y: 0 });
              }
            }}
          />
        </div>
      ) : null}
      {visualisationAnnotations
        ? visualisationAnnotations.annotations.map((annotation, index) => (
            <DisplayAnnotation
              key={index}
              annotation={annotation}
              id={lBDatasetUmapURL}
              deleteAnnotation={deleteAnnotation}
            />
          ))
        : null}
    </div>
  );
};

interface DisplayAnnotationProps {
  annotation: {
    x: number;
    y: number;
    comment: string;
    colour: string;
    user: { name: string; picture: string };
    commentedAt: string;
  };
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
      style={{
        position: "absolute",
        background: `var(--${annotation.colour}-400)`,
        left: annotation.x * 900,
        top: annotation.y * 562,
        borderRadius: "0px 6px 6px 6px",
        padding: "8px 12px",
        display: "flex",
        flexDirection: "row",
        alignItems: showDetailed ? "flex-start" : "center",
        gap: "8px",
      }}
      onPointerOver={() => setShowDetailed(true)}
      onPointerLeave={() => setShowDetailed(false)}
    >
      <UserAvatar
        name={annotation.user.name}
        src={annotation.user.picture}
        size='tiny'
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {showDetailed ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
              fontWeight: 500,
            }}
          >
            <p
              style={{
                fontSize: "10px",
                color: `var(--${annotation.colour}-200)`,
              }}
            >
              {annotation.user.name}
            </p>
            <span
              style={{
                opacity: 0.75,
                color: `var(--${annotation.colour}-200)`,
                fontSize: "8px",
              }}
            >
              Added {getTimeAgo(new Date(parseInt(annotation.commentedAt)))}
            </span>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: 12,
              margin: 0,
              lineHeight: 1,
              color: `var(--${annotation.colour}-100)`,
              fontWeight: 400,
            }}
          >
            {annotation.comment}
          </p>
        </div>
        {showDetailed ? (
          <button
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              borderRadius: "50%",
              background: "var(--pink-300)",
              border: "none",
              outline: "none",
              color: "var(--pink-100)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              deleteAnnotation(id, { ...annotation });
            }}
          >
            <DeleteIcon
              style={{
                width: "12px",
                height: "12px",
                cursor: "pointer",
              }}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
};
