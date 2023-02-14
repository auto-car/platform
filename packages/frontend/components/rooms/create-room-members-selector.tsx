import { RoomMember } from "@platform/model";
import React from "react";
import { Tooltip } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import styles from "../../components/rooms/create-room-dialog.module.css";
import { FormSection } from "./form-section";
import { CreateRoomFormProps } from "./create-room-dialog";

interface CreateRoomMembersSelectorProps {
  handleFormChange: <T extends keyof CreateRoomFormProps>(
    name: T,
    value: CreateRoomFormProps[T]
  ) => void;
  createRoomForm: CreateRoomFormProps;
  getMemberFromId: (id: string) => RoomMember;
  getOptions: () => RoomMember[];
  removeMember: (member: RoomMember) => void;
}
export const CreateRoomMembersSelector: React.FC<
  CreateRoomMembersSelectorProps
> = ({
  handleFormChange,
  createRoomForm,
  getMemberFromId,
  getOptions,
  removeMember,
}) => {
  return (
    <FormSection>
      <p style={{ fontSize: "14px" }}>Members</p>
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value=''
          onChange={(e) =>
            handleFormChange("members", [
              ...createRoomForm.members,
              getMemberFromId(e.target.value),
            ])
          }
        >
          <option value='' disabled>
            {createRoomForm.members.length === 0
              ? "Select members to join your room..."
              : createRoomForm.members.map((member) => member.name).join(", ")}
          </option>
          {getOptions().map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <span
        style={{
          fontSize: "12px",
          color: "var(--violet-200)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
          paddingTop: "8px",
        }}
      >
        {createRoomForm.members.length} Selected:
        {createRoomForm.members.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {createRoomForm.members.map((member) => (
              <div
                key={member.id}
                style={{
                  padding: "4px 8px",
                  borderRadius: "24px",
                  background: "var(--violet-200)",
                  color: "var(--violet-500)",
                  alignSelf: "flex-start",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <p style={{ fontSize: "10px" }}>{member.name}</p>
                <Tooltip
                  label='Click to remove member.'
                  fontSize={10}
                  color={"var(--violet-100-placeholder)"}
                  backgroundColor='var(--violet-500)'
                  padding='6px 8px'
                >
                  <CloseIcon
                    width={"7px"}
                    height={"7px"}
                    onClick={() => removeMember(member)}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        ) : (
          " Please select members to join your room."
        )}
      </span>
    </FormSection>
  );
};
