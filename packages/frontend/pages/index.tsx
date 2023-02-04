import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import React from "react";
import { User } from "@platform/model";
import { UserContext } from "../context/user-context";

export default function Home() {
  const router = useRouter();
  const { user: auth0User, error } = useUser();

  const { user, userDispatch } = React.useContext(UserContext);

  const handleLogin = React.useCallback(async () => {
    const user: Partial<User> = {
      email: auth0User?.email || undefined,
      name: auth0User?.name || undefined,
      nickname: auth0User?.nickname || undefined,
      picture: auth0User?.picture || undefined,
    };

    const createUser = await fetch("http://127.0.0.1:8787/user", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (createUser.ok) {
      const createdUser = await createUser.json<User>();
      userDispatch({ type: "login", payload: createdUser });

      router.push("/rooms");
    } else {
      alert(await createUser.text());
    }
  }, [router, auth0User, userDispatch]);

  React.useEffect(() => {
    if (auth0User) {
      console.log("Logged in user:", { auth0User });
      handleLogin();
    } else {
      router.push("/login");
    }
  }, [router, auth0User, handleLogin]);

  return <></>;
}
