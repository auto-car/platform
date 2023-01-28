import React from "react";

export const RoomsFilterSelector = () => {
  return (
    <div
      style={{
        background: "var(--violet-400)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <select
        style={{
          background: "var(--violet-400)",
          color: "var(--violet-100)",
          fontFamily: "Rubik",
          border: "none",
          outline: "none",
          cursor: "pointer",
          margin: 0,
          width: "100%",
          fontSize: "12px",
          fontWeight: 400,
        }}
      >
        <option>All Rooms</option>
        <option>Created by Me</option>
        <option>Shared with Me</option>
      </select>
    </div>
  );
};
