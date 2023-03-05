import React from "react";
import homeStyles from "../styles/home.module.css";

interface FilterRowViewToggleProps {
  isSelected: boolean;
  icon: JSX.Element;
  type: "list" | "card";
  onClick: VoidFunction;
}
export const FilterRowViewToggle: React.FC<FilterRowViewToggleProps> = ({
  isSelected,
  icon,
  type,
  onClick,
}) => {
  const toggleTitle = React.useMemo(
    () => (type === "list" ? "List View" : "Card View"),
    [type]
  );

  return (
    <button
      className={
        isSelected
          ? homeStyles.filterRowViewToggleSelected
          : homeStyles.filterRowViewToggle
      }
      onClick={onClick}
    >
      {icon}
      {toggleTitle}
    </button>
  );
};
