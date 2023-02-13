import { Room, RoomMember } from "@platform/model";
import { LogoHeader } from "../../components/logo-header/logo-header";
import { PageHeader } from "../../components/page-header";
import { UserContext } from "../../context/user-context";
import React from "react";
import { RoomsFilterableSection } from "../../components/rooms/rooms-filterable-section";
import { UserProfileButton } from "../../components/user-profile-button";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import styles from "../../components/rooms/create-room-dialog.module.css";
import { FormSection } from "../../components/rooms/form-section";

export default function Rooms() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [triggerReload, setTriggerReload] = React.useState(true);
  const { user, userDispatch } = React.useContext(UserContext);

  const getRooms = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_WORKER_URL}/user/rooms?id=${user.id}`
      );
      const rooms = await response.json<Room[]>();
      setRooms(rooms);
      setTriggerReload(false);
      userDispatch({ type: "rooms", payload: rooms });
    } catch (e) {
      console.error(e as Error);
    }
  }, [user, userDispatch]);

  React.useEffect(() => {
    if (triggerReload && user.id !== "") {
      getRooms();
    }
  }, [triggerReload, getRooms, user]);

  const doReload = React.useCallback(() => {
    setTriggerReload(true);
  }, []);

  return (
    <>
      <PageHeader title='AutoCAR | Rooms' />
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100vw",
          minHeight: "100vh",
          background: "var(--violet-500)",
        }}
      >
        <LogoHeader size='small' />
        <div
          style={{
            padding: "48px 17.5%",
            color: "var(--violet-100)",
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            width: "100%",
          }}
        >
          <hgroup>
            <h1 style={{ fontSize: "28px" }}>Rooms</h1>
            <span style={{ opacity: 0.75, fontSize: "16px" }}>
              View all your rooms in one place.
            </span>
          </hgroup>
          <CreateRoomButtonWithDialog doReload={doReload} />
          <RoomsFilterableSection filterOn='recentlyCreated' rooms={rooms} />
          <RoomsFilterableSection filterOn='roomsWithUser' rooms={rooms} />
        </div>
        <UserProfileButton />
      </main>
    </>
  );
}

interface CreateRoomButtonWithDialogProps {
  doReload: VoidFunction;
}

export const CreateRoomButtonWithDialog: React.FC<
  CreateRoomButtonWithDialogProps
> = ({ doReload }) => {
  const dialogDisclosureProps = useDisclosure();

  return (
    <>
      <CreateRoomDialog {...dialogDisclosureProps} doReload={doReload} />
      <button
        style={{
          border: "1px solid var(--violet-300)",
          borderRadius: "4px",
          background: "none",
          padding: "24px",
          alignSelf: "flex-start",
          outline: "none",
          color: "var(--violet-200)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          cursor: "pointer",
        }}
        onClick={dialogDisclosureProps.onOpen}
      >
        <hgroup
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h3>New Room</h3>
          <span style={{ fontSize: "14px" }}>
            Create a new room for analysing data
          </span>
        </hgroup>
        <span style={{ fontWeight: 500, fontSize: "24px" }}>+</span>
      </button>
    </>
  );
};

interface CreateRoomDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  doReload: VoidFunction;
}

interface CreateRoomFormProps {
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
                    : createRoomForm.members
                        .map((member) => member.name)
                        .join(", ")}
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
        </ModalBody>
        <ModalFooter
          style={{ justifyContent: "space-between", paddingTop: "36px" }}
        >
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
