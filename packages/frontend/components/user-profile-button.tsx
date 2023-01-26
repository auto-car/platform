import { LogoutIcon } from "icons/logout-icon";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { UserAvatar } from "./avatar/user-avatar";

export const UserProfileButton = () => {
  const [showProfileActions, setShowProfileActions] = React.useState(false);
  const router = useRouter();

  const onLogout = React.useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          position: "fixed",
          right: "48px",
          top: "48px",
          cursor: "pointer",
        }}
        onClick={() => setShowProfileActions((prev) => !prev)}
      >
        <UserAvatar />
        {showProfileActions ? (
          <menu
            style={{
              position: "absolute",
              right: "50%",
              bottom: "-64px",
              padding: "24px 36px",
              background: "var(--violet-300)",
              boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
              color: "var(--violet-100)",
              margin: 0,
              transformOrigin: "top right",
              borderRadius: "8px 0px 8px 8px",
              display: "flex",
              flexDirection: "column",
              width: "140px",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                gap: "12px",
              }}
            >
              <LogoutIcon width={24} height={24} className='' />
              <p>Menu Option</p>
            </div>
          </menu>
        ) : null}
      </div>
    </>
  );
};
