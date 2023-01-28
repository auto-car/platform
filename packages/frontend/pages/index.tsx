import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import React from "react";
import { User } from "@platform/model";

export default function Home() {
  const router = useRouter();
  const { user: auth0User, error } = useUser();

  const handleLogin = React.useCallback(async () => {
    const user: Partial<User> = {
      email: auth0User?.email || undefined,
      name: auth0User?.name || undefined,
      nickname: auth0User?.nickname || undefined,
      picture: auth0User?.picture || undefined,
    };

    const createUser = await fetch(
      "https://autocar-user-worker.kishek12.workers.dev/user",
      {
        method: "POST",
        body: JSON.stringify(user),
      }
    );

    if (createUser.ok) {
      router.push("/rooms");
    } else {
      alert(await createUser.text());
    }
  }, [router, auth0User]);

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
