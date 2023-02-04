import type { AppProps } from "next/app";
import "../styles/fonts.css";
import "normalize.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { userReducer, UserContext, initUser } from "../context/user-context";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { User } from "@platform/model";

export default function App({ Component, pageProps }: AppProps) {
  const [user, userDispatch] = React.useReducer(userReducer, initUser);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      userDispatch({ type: "login", payload: parsedUser });
    }
  }, []);

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
