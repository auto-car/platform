import React from "react";

interface CreateRoomCancelButtonProps {
  onClose: VoidFunction;
}
export const CreateRoomCancelButton: React.FC<CreateRoomCancelButtonProps> = ({
  onClose,
}) => {
  return (
    <button
      style={{
        border: "none",
        background: "var(--violet-500)",
        outline: "none",
        padding: "12px 16px",
        borderRadius: "4px",
        color: "var(--violet-200)",
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "12px",
      }}
      onClick={onClose}
    >
      Cancel
    </button>
  );
};
