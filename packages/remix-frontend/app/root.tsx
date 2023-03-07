import type { MetaFunction } from "@remix-run/cloudflare";
import normalize from "normalize.css";
import globals from "./styles/global.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ChakraProvider } from "@chakra-ui/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "AutoCAR Platform",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider resetCSS={false}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ChakraProvider>
      </body>
    </html>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: normalize },
    { rel: "stylesheet", href: globals },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
}
