import Image from "next/image";
import styles from "./logo-header.module.css";

export function LogoHeader() {
  return (
    <div className={styles.logoHeader}>
      <Image alt="logo" src={"/logo.svg"} width={64} height={64} />
      <hgroup className={styles.logoHeaderHeadings}>
        <h1 className={styles.logoHeading}>AutoCAR</h1>
        <p>CAR T-Cell Research with Collaboration</p>
      </hgroup>
    </div>
  );
}
