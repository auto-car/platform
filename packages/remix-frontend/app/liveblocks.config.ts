import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_caIFKz7NVe2Gnz03xdHwClL_KTj24jf7bzzMU4fnnfhPgl2BONa-UhDV34hPIwNy",
});

export const {
  suspense: {
    RoomProvider,
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
  },
} = createRoomContext(client);
