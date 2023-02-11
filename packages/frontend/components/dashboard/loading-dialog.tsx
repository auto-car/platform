import React from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

export const LoadingDialog = ({
  isOpen,
  title,
  expectedTime,
}: {
  isOpen: boolean;
  title: string;
  expectedTime: number;
}) => {
  const [time, setTime] = React.useState(0);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay style={{ background: "rgba(0, 0, 0, 0.85)" }} />
      <div
        style={{
          background: "none",
          color: "var(--violet-100)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed",
          zIndex: 100000,
        }}
      >
        <PuffLoader color='var(--violet-100)' />
        <hgroup
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>{title}</h1>
          <span style={{ fontSize: "12px" }}>
            This process may take up to {expectedTime} minutes...
          </span>
          {/* <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "var(--violet-200)",
              }}
            >
              Elapsed time:
            </span> */}
        </hgroup>
      </div>
    </Modal>
  );
};
