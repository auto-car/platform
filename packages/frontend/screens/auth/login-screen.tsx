import React from "react";
import { useRouter } from "next/router";
import { LogoHeader } from "../../components/logo-header/logo-header";
import styles from "./auth-screen.module.css";
import { Auth0Icon } from "icons/auth0-icon";

export const LoginScreen: React.FC = () => {
  const router = useRouter();

  const onLogin = React.useCallback(() => {
    router.replace("/api/auth/login");
  }, [router]);

  return (
    <main className={styles.main}>
      <LogoHeader />
      <div className={styles.loginSection}>
        <hgroup className={styles.loginHGroup}>
          <h2 className={styles.loginHeading}>Login to AutoCAR</h2>
          <p className={styles.loginInfo}>
            Auth0 is a secure third party authentication provider. <br />
            Login to AutoCAR using your Google or Microsoft account!
          </p>
        </hgroup>
        <button className={styles.loginActionButtonLogin} onClick={onLogin}>
          <Auth0Icon width={24} className={styles.auth0Icon} />
          Login with Auth0
        </button>
      </div>
    </main>
  );
};
