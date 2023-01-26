import React from "react";
import styles from "./auth-screen.module.css";
import { LogoHeader } from "../../components/logo-header/logo-header";
import { useRouter } from "next/router";

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const onBackToLogin = React.useCallback(() => {
    router.push("/login");
  }, [router]);

  const onTakeMeIn = React.useCallback(() => {
    router.push("/rooms");
  }, [router]);

  return (
    <main className={styles.main}>
      <LogoHeader />
      <div className={styles.loginSection}>
        <h2 className={styles.loginHeading}>Register</h2>
        <div className={styles.loginBody}>
          <input
            placeholder='Username'
            className={styles.loginInput}
            autoComplete='off'
          />
          <input
            placeholder='Password'
            className={styles.loginInput}
            autoComplete='off'
            type='password'
          />
          <input
            placeholder='Confirm Password'
            className={styles.loginInput}
            autoComplete='off'
            type='password'
          />
        </div>
        <div className={styles.loginActions}>
          <button
            className={styles.loginActionButtonSignUp}
            onClick={onBackToLogin}
          >
            I Have An Account
          </button>
          <button
            className={styles.loginActionButtonLogin}
            onClick={onTakeMeIn}
          >
            Take me In!
          </button>
        </div>
      </div>
    </main>
  );
};
