import type { LoaderArgs } from "@remix-run/cloudflare";

import { auth } from "../utils/auth.server";

export let loader = ({ request }: LoaderArgs) => {
  return auth.authenticate("auth0", request, {
    successRedirect: "/home",
    failureRedirect: "/",
  });
};
