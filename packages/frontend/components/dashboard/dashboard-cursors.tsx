import React from "react";
import { useOthers } from "../../liveblocks.config";
import { Cursor } from "./cursor";

export const DashboardCursors = () => {
  const others = useOthers();
  // If a cursor is on screen (not null), render
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        return presence.cursor ? (
          <Cursor
            userColour={presence.userColour as string}
            x={
              (presence.cursor as { x: number; y: number })["x"] *
              window.innerWidth
            }
            user={presence.user as string}
            y={
              (presence.cursor as { x: number; y: number })["y"] *
              window.innerHeight
            }
            key={connectionId}
          />
        ) : null;
      })}
    </>
  );
};
