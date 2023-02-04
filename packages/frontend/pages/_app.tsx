import type { AppProps } from "next/app";
import "../styles/fonts.css";
import "normalize.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { userReducer, UserContext, initUser } from "../context/user-context";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, userDispatch] = React.useReducer(userReducer, initUser);

  return (
    <ChakraProvider resetCSS={false}>
      <UserContext.Provider value={{ user, userDispatch }}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </UserContext.Provider>
    </ChakraProvider>
  );
}
