import Image from "next/image";
import styles from "./logo-header.module.css";

interface LogoHeaderProps {
  size?: "normal" | "small";
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ size = "normal" }) => {
  return (
    <div
      className={size === "normal" ? styles.logoHeader : styles.logoHeaderSmall}
    >
      <Image
        alt='logo'
        src={"/logo.svg"}
        width={size === "normal" ? 48 : 24}
        height={size === "normal" ? 48 : 24}
      />
      <hgroup className={styles.logoHeaderHeadings}>
        <h1
          className={
            size === "normal" ? styles.logoHeading : styles.logoHeadingSmall
          }
        >
          AutoCAR
        </h1>
        {size === "normal" ? (
          <p>CAR T-Cell Research with Collaboration</p>
        ) : null}
      </hgroup>
    </div>
  );
};
