import { authorize } from "@liveblocks/node";
import { NextApiRequest, NextApiResponse } from "next";

// Replace this key with your secret key provided at
// https://liveblocks.io/dashboard/projects/{projectId}/apikeys
const secret =
  "sk_dev_cFoCo9S9zbrampsU7q8_6M1eDjD7SUkf_xirT4zDmYMJoD01CTNHsV186s9mVQK9";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */
  const room = req.body.room;
  const result = await authorize({
    room,
    secret,
    userId: "123", // Optional
    groupIds: ["456"], // Optional
    userInfo: {
      // Optional, corresponds to the UserMeta[info] type defined in liveblocks.config.ts
      name: "Ada Lovelace",
      color: "red",
    },
  });
  return res.status(result.status).end(result.body);
}
