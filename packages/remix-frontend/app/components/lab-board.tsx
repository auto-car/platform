import React from "react";
import { useLoaderData } from "@remix-run/react";
import styles from "./lab.module.css";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
  useTransformEffect,
  useControls,
} from "react-zoom-pan-pinch";
import { useUpdateMyPresence } from "app/liveblocks.config";
import { LabBoardCursors } from "./lab-board-cursors";
import { BoardWidgetLarge } from "./board-widget-large";
import { type UserLoader } from "app/routes/home/$team/lab";
import { CursorIcon } from "app/icons/cursor";
import { MoveIcon } from "app/icons/move-icon";
import { ZoomInIcon } from "app/icons/zoom-in-icon";
import { ZoomOutIcon } from "app/icons/zoom-out-icon";

export const LabBoard = () => {
  const transformRef = React.useRef<ReactZoomPanPinchRef | null>(null);

  const updateMyPresence = useUpdateMyPresence();
  const { profile: user } = useLoaderData<UserLoader>();

  const [selectedControl, setSelectedControl] = React.useState<
    "select" | "move"
  >("move");

  const handleSelectControl = React.useCallback(
    (control: "select" | "move") => setSelectedControl(control),
    []
  );

  React.useEffect(() => {
    const wrapper = document.getElementById("lab-board-wrapper");
    if (wrapper) {
      if (selectedControl === "move") {
        wrapper.style.setProperty("cursor", "grab");
      } else {
        wrapper.style.setProperty("cursor", "auto");
      }
    }
  }, [selectedControl]);

  const onPointerUp = React.useCallback(() => {
    const wrapper = document.getElementById("lab-board-wrapper");
    if (wrapper) {
      if (selectedControl === "move") {
        wrapper.style.setProperty("cursor", "grab");
      }
    }
  }, [selectedControl]);

  const onPointerDown = React.useCallback(() => {
    const wrapper = document.getElementById("lab-board-wrapper");
    if (wrapper) {
      if (selectedControl === "move") {
        wrapper.style.setProperty("cursor", "grabbing");
      }
    }
  }, [selectedControl]);

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const wrapper = document.getElementById("lab-board-wrapper");
      if (wrapper) {
        const presenceObj = {
          cursor: {
            x: Math.round(
              Math.round(
                e.clientX - (transformRef.current?.state?.positionX || 0)
              ) / (transformRef.current?.state?.scale || 1)
            ),
            y: Math.round(
              Math.round(
                e.clientY -
                  wrapper.getBoundingClientRect().y -
                  (transformRef.current?.state?.positionY || 0)
              ) / (transformRef.current?.state?.scale || 1)
            ),
          },
          user: user.name ? user.name.givenName : "Bob",
          // userColour: getUserColour(),
        };
        updateMyPresence(presenceObj);
      }
    },
    [updateMyPresence, user.name]
  );

  const onPointerLeave = React.useCallback(
    () => updateMyPresence({ cursor: null }),
    [updateMyPresence]
  );

  const onPanningStart = React.useCallback((ref: ReactZoomPanPinchRef) => {
    const factor =
      ref.state.scale === 1
        ? 1
        : ref.state.scale < 1.5
        ? ref.state.scale * 1.5
        : ref.state.scale * 1.95;

    ref.instance.bounds = {
      minPositionX: -600 * factor,
      minPositionY: -400 * factor,
      maxPositionX: 0,
      maxPositionY: 0,
    };
    console.log(ref.instance.bounds);
  }, []);

  const [isAnnotating, setIsAnnotating] = React.useState(false);

  const mockWidgets = [
    "mock-umap-1",
    "mock-umap-2",
    "mock-umap-3",
    "mock-umap-4",
  ];

  return (
    <>
      <div
        id='lab-board-wrapper'
        className={styles.labBoardWrapper}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <TransformWrapper
          maxScale={2}
          minScale={1}
          wheel={{ touchPadDisabled: true, step: 0.2, disabled: isAnnotating }}
          pinch={{ step: 0.2, disabled: isAnnotating }}
          centerOnInit={false}
          doubleClick={{ disabled: true }}
          minPositionX={-window.innerWidth * 2}
          minPositionY={-window.innerHeight * 2}
          maxPositionX={0}
          maxPositionY={0}
          ref={transformRef}
          onPanningStart={onPanningStart}
          centerZoomedOut={false}
          panning={{ disabled: selectedControl === "select" }}
        >
          <TransformComponent>
            <div className={styles.labBoard}>
              {mockWidgets.map((id, key) => (
                <BoardWidgetLarge
                  id={id}
                  key={key}
                  isPanningMode={selectedControl === "move"}
                  setIsAnnotating={setIsAnnotating}
                />
              ))}
            </div>
          </TransformComponent>
          <LabBoardControls
            selectedControl={selectedControl}
            handleSelectControl={handleSelectControl}
            isAnnotating={isAnnotating}
          />
        </TransformWrapper>
        <LabBoardCursors transformRef={transformRef.current} />
      </div>
    </>
  );
};

interface LabBoardControlsProps {
  selectedControl: "move" | "select";
  handleSelectControl: (control: "move" | "select") => void;
  isAnnotating: boolean;
}

const LabBoardControls: React.FC<LabBoardControlsProps> = ({
  selectedControl,
  handleSelectControl,
  isAnnotating,
}) => {
  const { zoomIn, zoomOut } = useControls();
  const [currentZoom, setCurrentZoom] = React.useState(1);
  useTransformEffect(({ state }) => {
    if (!isAnnotating) {
      setCurrentZoom(Number(state.scale.toFixed(1)));
    }
  });

  const handleZoomIn = React.useCallback(() => {
    if (!isAnnotating) {
      zoomIn(0.2);
    }
  }, [isAnnotating, zoomIn]);

  const handleZoomOut = React.useCallback(() => {
    if (!isAnnotating) {
      zoomOut(0.2);
    }
  }, [isAnnotating, zoomOut]);

  return (
    <div className={styles.labBoardControls}>
      <div className={styles.labBoardCursorControls}>
        <button
          onClick={() => handleSelectControl("select")}
          className={
            selectedControl === "select"
              ? styles.labBoardControlSelectedLeft
              : styles.labBoardControlLeft
          }
        >
          <CursorIcon height={16} width={16} />
        </button>
        <button
          onClick={() => handleSelectControl("move")}
          className={
            selectedControl === "move"
              ? styles.labBoardControlSelectedRight
              : styles.labBoardControlRight
          }
        >
          <MoveIcon height={16} width={16} />
        </button>
      </div>
      <div className={styles.labBoardZoomControls}>
        <button onClick={handleZoomIn} className={styles.labBoardControlLeft}>
          <ZoomInIcon height={10} />
        </button>
        <p className={styles.labBoardZoomText}>
          Current Zoom: {(currentZoom * 100).toFixed(0)}%
        </p>
        <button onClick={handleZoomOut} className={styles.labBoardControlRight}>
          <ZoomOutIcon width={10} />
        </button>
      </div>
    </div>
  );
};
