import React from "react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useParams } from "@remix-run/react";
import { LabsViewRenderer } from "app/components/labs-view-renderer";
import { MenuPanel } from "app/components/menu-panel";
import { DataCollectionViewRenderer } from "app/components/team-view-renderer";
import { UserProfileButton } from "app/components/user-profile-button";
import { auth } from "app/utils/auth.server";
import type { DataCollection, LabsCategory } from "app/utils/constants";
import { mockMenu } from "app/utils/constants";
import homeStyles from "../../../styles/home.module.css";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

export default function Team() {
  const params = useParams();
  const [team, setTeam] = React.useState("");

  React.useEffect(() => {
    setTeam(params.team as string);
  }, [params]);

  const [selected, setSelected] = React.useState<DataCollection | LabsCategory>(
    mockMenu[0].items[0]
  );
  const { profile: user } = useLoaderData<typeof loader>();

  const handleSelectItem = React.useCallback(
    (item: DataCollection | LabsCategory) => {
      setSelected(item);
    },
    []
  );

  return (
    <main className={homeStyles.homeView}>
      <UserProfileButton
        name={user?.name?.givenName || ""}
        picture={user?._json?.picture || ""}
      />
      <>
        <MenuPanel
          team={team}
          selected={selected}
          handleSelectItem={handleSelectItem}
        />
        <HomePanel selected={selected} team={team} />
      </>
    </main>
  );
}

interface HomePanelProps {
  selected: DataCollection | LabsCategory;
  team: string;
}

const HomePanel: React.FC<HomePanelProps> = ({ selected, team }) => {
  return (
    <div className={homeStyles.homePanel}>
      {selected.contentType === "data-collection" ? (
        <DataCollectionViewRenderer team={selected as DataCollection} />
      ) : (
        <LabsViewRenderer labCategory={selected as LabsCategory} team={team} />
      )}
    </div>
  );
};
