import React from "react";
import { useRouter } from "next/router";
import { LogoHeader } from "../../components/logo-header/logo-header";
import styles from "./auth-screen.module.css";

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: "",
  });

  const onSignUp = React.useCallback(() => {
    router.push("/register");
  }, [router]);

  const onLogin = React.useCallback(() => {
    const id = crypto.randomUUID();
    router.push(`/dashboard?room=${id}`);
    localStorage.setItem(`room-username`, loginForm.username);
  }, [router, loginForm]);

  return (
    <main className={styles.main}>
      <LogoHeader />
      <div className={styles.loginSection}>
        <h2 className={styles.loginHeading}>Login</h2>
        <div className={styles.loginBody}>
          <input
            placeholder="Username"
            className={styles.loginInput}
            autoComplete="off"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
            placeholder="Password"
            className={styles.loginInput}
            autoComplete="off"
            type="password"
          />
        </div>
        <div className={styles.loginActions}>
          <button className={styles.loginActionButtonSignUp} onClick={onSignUp}>
            Sign Up
          </button>
          <button className={styles.loginActionButtonLogin} onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </main>
  );
};
