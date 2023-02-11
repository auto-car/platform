import React from "react";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { useOthers } from "../../liveblocks.config";
import { Cursor } from "./cursor";

interface DashboardCursorsProps {
  transformRef: ReactZoomPanPinchRef | null;
}

export const DashboardCursors: React.FC<DashboardCursorsProps> = ({
  transformRef,
}) => {
  const others = useOthers();
  // If a cursor is on screen (not null), render
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        return presence.cursor ? (
          <Cursor
            userColour={presence.userColour as string}
            x={
              (presence.cursor as { x: number; y: number })["x"] +
              (transformRef?.state.positionX || 0)
            }
            user={presence.user as string}
            y={
              (presence.cursor as { x: number; y: number })["y"] +
              (transformRef?.state.positionY || 0)
            }
            key={connectionId}
          />
        ) : null;
      })}
    </>
  );
};
