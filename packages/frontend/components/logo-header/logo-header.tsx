import Image from "next/image";
import styles from "./logo-header.module.css";

interface LogoHeaderProps {
  size?: "normal" | "small";
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ size = "normal" }) => {
  return (
    <div className={styles.logoHeader}>
      <Image
        alt='logo'
        src={"/logo.svg"}
        width={size === "normal" ? 64 : 32}
        height={size === "normal" ? 64 : 32}
      />
      {size === "normal" ? (
        <hgroup className={styles.logoHeaderHeadings}>
          <h1 className={styles.logoHeading}>AutoCAR</h1>
          <p>CAR T-Cell Research with Collaboration</p>
        </hgroup>
      ) : null}
    </div>
  );
};
