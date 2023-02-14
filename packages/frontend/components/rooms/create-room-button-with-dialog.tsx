import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { CreateRoomDialog } from "./create-room-dialog";

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
