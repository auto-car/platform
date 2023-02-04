import React from "react";
import { FilterType } from "./rooms-filterable-section";

interface RoomsFilterSelectorProps {
  selectedFilter: FilterType;
  handleSelection: (filterType: FilterType) => void;
}

export const RoomsFilterSelector: React.FC<RoomsFilterSelectorProps> = ({
  selectedFilter,
  handleSelection,
}) => {
  const options = [
    { label: "All Rooms", value: FilterType.All },
    { label: "Created by Me", value: FilterType.CreatedByMe },
    { label: "Shared with Me", value: FilterType.SharedWithMe },
  ];

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
        value={selectedFilter}
        onChange={(e) => handleSelection(e.target.value as FilterType)}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
