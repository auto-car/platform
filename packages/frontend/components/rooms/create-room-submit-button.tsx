import React from "react";

interface CreateRoomSubmitButtonProps {
  handleSubmit: () => Promise<void>;
}
export const CreateRoomSubmitButton: React.FC<CreateRoomSubmitButtonProps> = ({
  handleSubmit,
}) => {
  return (
    <button
      style={{
        border: "none",
        background: "var(--violet-300)",
        outline: "none",
        padding: "12px 16px",
        borderRadius: "4px",
        color: "var(--violet-100)",
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "12px",
      }}
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};
