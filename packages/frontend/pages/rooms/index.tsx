import { Room } from "@platform/model";
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

export default function Rooms() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const { user } = React.useContext(UserContext);
  // const getRooms = React.useCallback(async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1/8787/user/rooms', {method: "GET", body: JSON.stringify({id: })})
  //   } catch (e) {
  //     console.error(e as Error);
  //   }
  // }, [])

  React.useEffect(() => {
    console.log("User from context:", user);
    setRooms(user.rooms);
  }, [user]);

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
          <CreateRoomButtonWithDialog />
          <RoomsFilterableSection filterOn='recentlyCreated' rooms={rooms} />
          <RoomsFilterableSection filterOn='roomsWithUser' rooms={rooms} />
        </div>
        <UserProfileButton />
      </main>
    </>
  );
}

export const CreateRoomButtonWithDialog = () => {
  const dialogDisclosureProps = useDisclosure();

  return (
    <>
      <CreateRoomDialog {...dialogDisclosureProps} />
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
  onOpen: VoidFunction;
}

interface CreateRoomFormProps {
  name: string;
  members: string[];
}

export const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [createRoomForm, setCreateRoomForm] =
    React.useState<CreateRoomFormProps>({
      name: "",
      members: [],
    });

  const handleSubmit = React.useCallback(() => {}, []);

  const getOptions = React.useCallback(() => {
    const options = ["Member 1", "Member 2", "Member 3", "Member 4"];
    return options.filter((option) => !createRoomForm.members.includes(option));
  }, [createRoomForm]);

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
    (member: string) => {
      handleFormChange(
        "members",
        createRoomForm.members.filter(
          (existingMember) => existingMember !== member
        )
      );
    },
    [createRoomForm, handleFormChange]
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
                    e.target.value,
                  ])
                }
              >
                <option value='' disabled>
                  {createRoomForm.members.length === 0
                    ? "Select members to join your room..."
                    : createRoomForm.members.join(", ")}
                </option>
                {getOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                      key={member}
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
                      <p style={{ fontSize: "10px" }}>{member}</p>
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
          >
            Submit
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const FormSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
};
