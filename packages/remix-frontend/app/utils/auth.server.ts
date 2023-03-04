import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_remix_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const auth = new Authenticator<Auth0Profile>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "localhost:8787/callback",
    domain: "autocar-prod.au.auth0.com",
    clientID: "zMKgQIJKJWnAwk6DfhgLhJKCpp7QE0a8",
    clientSecret:
      "YshkdoKzpAK8kdIGfhkDLlDbKca22jbbkQrztMi9vcCRq4cZWcpcHgNz_pnR7dgs",
  },
  async ({ profile }) => {
    //
    // Use the returned information to process or write to the DB.
    //
    console.log({ profile });
    return profile;
  }
);

auth.use(auth0Strategy);

export const { getSession, commitSession, destroySession } = sessionStorage;
