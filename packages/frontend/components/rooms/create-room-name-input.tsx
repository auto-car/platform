import React from "react";
import { FormSection } from "./form-section";
import { CreateRoomFormProps } from "./create-room-dialog";

interface CreateRoomNameInputProps {
  createRoomForm: CreateRoomFormProps;
  handleFormChange: <T extends keyof CreateRoomFormProps>(
    name: T,
    value: CreateRoomFormProps[T]
  ) => void;
}
export const CreateRoomNameInput: React.FC<CreateRoomNameInputProps> = ({
  createRoomForm,
  handleFormChange,
}) => {
  return (
    <FormSection>
      <p style={{ fontSize: "14px" }}>Room Name</p>
      <input
        style={{
          padding: "16px 12px",
          background: "var(--violet-500)",
          border: "none",
          outline: "none",
          fontSize: "12px",
          color: "var(--violet-100)",
          width: "calc(100% - 24px)",
          borderRadius: "4px",
        }}
        value={createRoomForm.name}
        onChange={(e) => handleFormChange("name", e.target.value)}
        placeholder='Enter room name...'
      />
    </FormSection>
  );
};
