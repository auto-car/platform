import React from "react";

export const FormSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
};
