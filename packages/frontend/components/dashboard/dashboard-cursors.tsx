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
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence) {
          const { cursor, userColour, user } = presence as {
            cursor: { x: number; y: number };
            userColour: string;
            user: string;
          };
          return (
            <Cursor
              userColour={userColour}
              x={cursor.x + (transformRef?.state.positionX || 0)}
              user={user}
              y={cursor.y + (transformRef?.state.positionY || 0)}
              key={connectionId}
            />
          );
        }
        return null;
      })}
    </>
  );
};
