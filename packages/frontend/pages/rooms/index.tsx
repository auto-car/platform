import { LogoHeader } from "components/logo-header/logo-header";
import React from "react";
import { RoomsFilterableSection } from "../../components/rooms/rooms-filterable-section";
import { UserProfileButton } from "../../components/user-profile-button";

export default function Rooms() {
  return (
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
          padding: "48px 15%",
          color: "var(--violet-100)",
          display: "flex",
          flexDirection: "column",
          gap: "72px",
          width: "100%",
        }}
      >
        <hgroup>
          <h1>Rooms</h1>
          <span style={{ opacity: 0.75 }}>
            View all your rooms in one place.
          </span>
        </hgroup>
        <RoomsFilterableSection filterOn='recentlyCreated' rooms={[1]} />
        <RoomsFilterableSection filterOn='roomsWithUser' rooms={[1]} />
      </div>
      <UserProfileButton />
    </main>
  );
}
