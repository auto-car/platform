import React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import homeStyles from "../styles/home.module.css";
import { auth } from "../utils/auth.server";
import { MenuPanel } from "../components/menu-panel";
import { UserProfileButton } from "app/components/user-profile-button";
import { TeamViewRenderer } from "../components/team-view-renderer";
import { LabsViewRenderer } from "../components/labs-view-renderer";
import { type Team, type LabsCategory, mockMenu } from "../utils/constants";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

export default function Home() {
  const [selected, setSelected] = React.useState<Team | LabsCategory>(
    mockMenu[0].items[0]
  );
  const { profile: user } = useLoaderData<typeof loader>();

  const handleSelectItem = React.useCallback((item: Team | LabsCategory) => {
    setSelected(item);
  }, []);

  return (
    <main className={homeStyles.homeView}>
      <UserProfileButton
        name={user?.name?.givenName || ""}
        picture={user?._json?.picture || ""}
      />
      <MenuPanel selected={selected} handleSelectItem={handleSelectItem} />
      <HomePanel selected={selected} />
    </main>
  );
}

interface HomePanelProps {
  selected: Team | LabsCategory;
}

const HomePanel: React.FC<HomePanelProps> = ({ selected }) => {
  return (
    <div className={homeStyles.homePanel}>
      {selected.contentType === "team" ? (
        <TeamViewRenderer team={selected as Team} />
      ) : (
        <LabsViewRenderer labCategory={selected as LabsCategory} />
      )}
    </div>
  );
};
