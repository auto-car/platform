import React from "react";
import { useSearchParams } from "@remix-run/react";
import { LiveList } from "@liveblocks/client";
import { RoomProvider } from "app/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LabView } from "../../../components/lab-view";
import {
  json,
  type TypedResponse,
  type LoaderArgs,
} from "@remix-run/cloudflare";
import { auth } from "app/utils/auth.server";
import { type Auth0Profile } from "remix-auth-auth0";
import { LoadingScreen } from "app/components/lab-loading-screen";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({ profile });
};

export type UserLoader = ({ request }: LoaderArgs) => Promise<
  TypedResponse<{
    profile: Auth0Profile;
  }>
>;

export default function Lab() {
  const [url] = useSearchParams();
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    setId(url.get("id") || "");
  }, [url]);

  const initialStorage = {
    availableColours: new LiveList([
      "blue",
      "green",
      "orange",
      "pink",
      "violet",
    ]),
    id,
    annotations: new LiveList([]),
  };

  if (id === "") {
    return <LoadingScreen />;
  }

  return (
    <RoomProvider
      id={id}
      initialPresence={{ cursor: null }}
      initialStorage={{ ...initialStorage }}
    >
      <ClientSideSuspense fallback={<LoadingScreen />}>
        {() => <LabView id={id} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
