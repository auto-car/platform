import type { ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { destroySession, getSession } from "../utils/auth.server";

export const action = async ({ request }: ActionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const logoutURL = new URL("http://localhost:8787");

  logoutURL.searchParams.set("client_id", "zMKgQIJKJWnAwk6DfhgLhJKCpp7QE0a8");
  logoutURL.searchParams.set("returnTo", "localhost:8787");

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
