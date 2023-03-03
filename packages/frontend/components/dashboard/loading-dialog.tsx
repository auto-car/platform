import React from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";
import styles from "./loading-dialog.module.css";

interface LoadingDialogProps {
  isOpen: boolean;
  title: string;
  expectedTime: number;
}

export const LoadingDialog: React.FC<LoadingDialogProps> = ({
  isOpen,
  title,
  expectedTime,
}) => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return clearInterval(interval);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay className={styles.overlayBackground} />
      <div className={styles.loadingContent}>
        <PuffLoader color='var(--violet-100)' />
        <hgroup className={styles.loadingTextHGroup}>
          <h1>{title}</h1>
          <span className={styles.loadingSubtext}>
            This process may take up to {expectedTime} minutes...
          </span>
          <span className={styles.elapsedTime}>
            Elapsed time: {secondsToTime(time)}
          </span>
        </hgroup>
      </div>
    </Modal>
  );
};

const secondsToTime = (secondsToFormat: number) => {
  const minutes = Math.floor(secondsToFormat / 60);
  const minutesString = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  const seconds = secondsToFormat % 60;
  const secondsString = `${seconds} second${seconds !== 1 ? "s" : ""}`;

  if (minutes > 0) {
    return `${minutesString} and ${secondsString}`;
  }
  return secondsString;
};
