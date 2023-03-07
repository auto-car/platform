import styles from "./lab.module.css";
import GridLoader from "react-spinners/GridLoader";

export const LoadingScreen = () => {
  return (
    <main className={styles.loading}>
      <GridLoader size={24} color='#f0dbff' />
      <h1 className={styles.loadingText}>Preparing your lab...</h1>
    </main>
  );
};
