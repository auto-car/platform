import { RoomMember } from "@platform/model";
import { UserContext } from "../../context/user-context";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { CreateRoomNameInput } from "./create-room-name-input";
import { CreateRoomMembersSelector } from "./create-room-members-selector";
import { CreateRoomCancelButton } from "./create-room-cancel-button";
import { CreateRoomSubmitButton } from "./create-room-submit-button";

interface CreateRoomDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  doReload: VoidFunction;
}

export interface CreateRoomFormProps {
  name: string;
  members: RoomMember[];
}

export const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  isOpen,
  onClose,
  doReload,
}) => {
  const { user } = React.useContext(UserContext);
  const [createRoomForm, setCreateRoomForm] =
    React.useState<CreateRoomFormProps>({
      name: "",
      members: [],
    });
  const [memberOptions, setMemberOptions] = React.useState<RoomMember[]>([]);

  const handleSubmit = React.useCallback(async () => {
    try {
      await fetch(process.env.NEXT_PUBLIC_ROOM_WORKER_URL + "/room", {
        method: "POST",
        body: JSON.stringify({
          ...createRoomForm,
          owner: { id: user.id, name: user.name, picture: user.picture },
        }),
      });
      onClose();
      setCreateRoomForm({ name: "", members: [] });
      doReload();
    } catch (e) {
      console.error(e as Error);
    }
  }, [createRoomForm, user, doReload, onClose]);

  const updateOptions = React.useCallback(async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_USER_WORKER_URL + "/users"
      );
      const usersInAutocar = await response.json<RoomMember[]>();
      setMemberOptions(
        usersInAutocar.filter((option) => option.id !== user.id)
      );
    } catch (e) {
      console.error(e as Error);
    }
  }, [user]);

  const handleFormChange = React.useCallback(
    <T extends keyof CreateRoomFormProps>(
      name: T,
      value: CreateRoomFormProps[T]
    ) => {
      setCreateRoomForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const removeMember = React.useCallback(
    (member: RoomMember) => {
      handleFormChange(
        "members",
        createRoomForm.members.filter(
          (existingMember) => existingMember.id !== member.id
        )
      );
    },
    [createRoomForm, handleFormChange]
  );

  React.useEffect(() => {
    updateOptions();
  }, [updateOptions]);

  const getOptions = React.useCallback(() => {
    return memberOptions.filter(
      (option) =>
        createRoomForm.members.filter((selected) => selected.id === option.id)
          .length === 0
    );
  }, [memberOptions, createRoomForm]);

  const getMemberFromId = React.useCallback(
    (id: string) => {
      const member = memberOptions.filter((member) => member.id === id);
      if (member.length === 0) {
        throw new Error("Error: can't find member...");
      }
      return member[0];
    },
    [memberOptions]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        style={{
          background: "var(--violet-400)",
          color: "var(--violet-200)",
          padding: "32px 16px",
          width: "560px",
        }}
        maxWidth='unset'
      >
        <ModalHeader>
          <h3>Create Room</h3>
        </ModalHeader>
        <ModalBody
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <CreateRoomNameInput
            createRoomForm={createRoomForm}
            handleFormChange={handleFormChange}
          />
          <CreateRoomMembersSelector
            handleFormChange={handleFormChange}
            createRoomForm={createRoomForm}
            getMemberFromId={getMemberFromId}
            getOptions={getOptions}
            removeMember={removeMember}
          />
        </ModalBody>
        <ModalFooter
          style={{ justifyContent: "space-between", paddingTop: "36px" }}
        >
          <CreateRoomCancelButton onClose={onClose} />
          <CreateRoomSubmitButton handleSubmit={handleSubmit} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
