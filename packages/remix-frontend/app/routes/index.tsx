import { Auth0Icon } from "app/icons/auth0-icon";
import { LogoIcon } from "app/icons/logo";
import homeStyles from "../styles/login.module.css";
import loginUmapImage from "../images/home-umap.png";
import loginQcImage from "../images/home-qc.png";
import { CursorIcon } from "app/icons/cursor";
import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <main className={homeStyles.loginView}>
      <div className={homeStyles.logoAndHgroup}>
        <LogoIcon width={48} height={48} className={homeStyles.logo} />
        <hgroup className={homeStyles.hgroup}>
          <h1 className={homeStyles.heading}>AutoCAR</h1>
          <p className={homeStyles.subheading}>
            CAR T-Cell Research with real-time collaboration.
          </p>
        </hgroup>
      </div>
      <Form action='/auth0' method='post'>
        <button className={homeStyles.authButton}>
          <Auth0Icon width={24} height={24} className={homeStyles.authIcon} />
          <p>Login with Auth0</p>
        </button>
      </Form>
      <div className={homeStyles.loginUmapImageWrapper}>
        <img
          className={homeStyles.loginUmapImage}
          src={loginUmapImage}
          alt='Umap'
        />
        <div className={homeStyles.alice}>
          <CursorIcon
            width={24}
            height={24}
            className={homeStyles.aliceCursor}
          />
          <p className={homeStyles.aliceCursorLabel}>Alice</p>
        </div>
        <div className={homeStyles.bob}>
          <CursorIcon width={24} height={24} className={homeStyles.bobCursor} />
          <p className={homeStyles.bobCursorLabel}>Bob</p>
        </div>
      </div>
      <div className={homeStyles.loginQcImageWrapper}>
        <img
          className={homeStyles.loginQcImage}
          src={loginQcImage}
          alt='Umap'
        />
        <div className={homeStyles.alex}>
          <CursorIcon
            width={24}
            height={24}
            className={homeStyles.alexCursor}
          />
          <p className={homeStyles.alexCursorLabel}>Alex</p>
        </div>
      </div>
    </main>
  );
}
