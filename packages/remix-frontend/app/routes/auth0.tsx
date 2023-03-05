import { type ActionArgs, redirect } from "@remix-run/cloudflare";

import { auth } from "../utils/auth.server";

export let loader = async () => redirect("/");

export let action = async ({ request }: ActionArgs) => {
  return auth.authenticate("auth0", request, {
    successRedirect: "/home",
    failureRedirect: "/",
  });
};
