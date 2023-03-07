import React from "react";
import { type ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { useOthers } from "app/liveblocks.config";
import { CursorIcon } from "app/icons/cursor";
import cursorStyles from "../styles/cursor.module.css";

interface LabBoardCursorsProps {
  transformRef: ReactZoomPanPinchRef | null;
}
export const LabBoardCursors: React.FC<LabBoardCursorsProps> = ({
  transformRef,
}) => {
  const others = useOthers();
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence) {
          const { cursor, user } = presence as {
            cursor: { x: number; y: number } | null;
            user: string;
          };
          if (cursor) {
            return (
              <Cursor
                x={cursor.x + (transformRef?.state.positionX || 0)}
                user={user}
                y={cursor.y + (transformRef?.state.positionY || 0)}
                key={connectionId}
              />
            );
          }
          return null;
        }
        return null;
      })}
    </>
  );
};

interface CursorProps {
  x: number;
  y: number;
  user: string;
}

const Cursor: React.FC<CursorProps> = ({ x, y, user }) => {
  return (
    <div
      className={cursorStyles.cursor}
      style={{
        top: y,
        left: x,
        position: "absolute",
        zIndex: 2,
      }}
    >
      <CursorIcon width={24} height={24} />
      <div className={cursorStyles.cursorLabel}>
        <p>{user}</p>
      </div>
    </div>
  );
};
