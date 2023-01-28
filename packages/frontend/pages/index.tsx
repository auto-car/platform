import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();
  const { user, error } = useUser();
  React.useEffect(() => {
    if (user) {
      console.log("Logged in user:", { user });
      router.push("/rooms");
    } else {
      router.push("/login");
    }
  }, [router, user, error]);

  return <></>;
}
