import { LogoHeader } from "components/logo-header/logo-header";
import { PageHeader } from "components/page-header";
import React from "react";
import { RoomsFilterableSection } from "../../components/rooms/rooms-filterable-section";
import { UserProfileButton } from "../../components/user-profile-button";

export default function Rooms() {
  return (
    <>
      <PageHeader title='AutoCAR | Rooms' />
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100vw",
          minHeight: "100vh",
          background: "var(--violet-500)",
        }}
      >
        {/* <aside
        style={{
          padding: "64px 48px",
          background: "var(--violet-600)",
          width: "240px",
          borderRight: "1px solid var(--violet-200)",
        }}
      >
        <h2 style={{ color: "var(--violet-100)" }}>Rooms</h2>
      </aside> */}
        <LogoHeader size='small' />
        <div
          style={{
            padding: "48px 17.5%",
            color: "var(--violet-100)",
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            width: "100%",
          }}
        >
          <hgroup>
            <h1 style={{ fontSize: "28px" }}>Rooms</h1>
            <span style={{ opacity: 0.75, fontSize: "16px" }}>
              View all your rooms in one place.
            </span>
          </hgroup>
          <button
            style={{
              border: "1px solid var(--violet-300)",
              borderRadius: "4px",
              background: "none",
              padding: "24px",
              alignSelf: "flex-start",
              outline: "none",
              color: "var(--violet-200)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
            }}
          >
            <hgroup
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3>New Room</h3>
              <span style={{ fontSize: "14px" }}>
                Create a new room for analysing data
              </span>
            </hgroup>
            <span style={{ fontWeight: 500, fontSize: "24px" }}>+</span>
          </button>
          <RoomsFilterableSection filterOn='recentlyCreated' rooms={[1]} />
          <RoomsFilterableSection filterOn='roomsWithUser' rooms={[1]} />
        </div>
        <UserProfileButton />
      </main>
    </>
  );
}
