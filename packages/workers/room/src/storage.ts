import { decorateResponse } from "./decorateResponse";
import { Owner, Room, RoomMember, User } from "@platform/model";
import { Env } from ".";

export class StorageDO {
  state: DurableObjectState;
  roomService: RoomService;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.roomService = new RoomService(env);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR User Worker: Alive and well!!",
          200
        );
      case "/room":
        switch (request.method) {
          case "POST":
            return this.roomService.createRoom(request, this.state);
          default:
            return decorateResponse("Base user endpoint", 200);
        }
      case "/rooms":
        return decorateResponse(
          JSON.stringify(
            Array.from((await this.state.storage.list()).entries())
          ),
          200
        );
      default:
        return decorateResponse("Endpoint not found...", 404);
    }
  }
}

class RoomService {
  env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async createRoom(request: Request, state: DurableObjectState) {
    try {
      const createdAt = new Date(Date.now());
      const roomDefaults: Room = {
        createdAt,
        id: crypto.randomUUID(),
        updatedAt: createdAt,
        members: [] as RoomMember[],
        owner: {} as Owner,
        name: "",
      };

      const room = await request.json<Partial<Room>>();
      const createdRoomObj: Room = { ...roomDefaults, ...room };
      // Check if room with this id already exists
      const existingObj = await state.storage.get<User>(
        `room:${createdRoomObj.id}`
      );
      if (existingObj) {
        return decorateResponse(
          "Error: Room with this id already exists.",
          400
        );
      }

      // Add room to storage with id index
      await state.storage.put(`room:${createdRoomObj.id}`, createdRoomObj);

      // Add room to the owner's rooms
      await this.env.USER.fetch("/user/room", {
        method: "POST",
        body: JSON.stringify({
          id: createdRoomObj.owner.id,
          room: createdRoomObj,
        }),
      });

      return decorateResponse("Successfully created room!", 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when creating room: " + (e as Error).message,
        400
      );
    }
  }

  async shareRoom(request: Request, state: DurableObjectState) {
    try {
      const shareRoomObj = await request.json<{
        id: string;
        userToShareId: string;
        roomId: string;
      }>();
      // Check if given user id is owner of room
      const room = await state.storage.get<Room>(`room:${shareRoomObj.roomId}`);
      if (!room) {
        return decorateResponse("Error: room does not exist: ", 400);
      }

      if (room.owner.id !== shareRoomObj.id) {
        return decorateResponse(
          "Error: you do not have rights to share this room: ",
          400
        );
      }

      // Add new user to the room's members
      const newMemberResponse = await this.env.USER.fetch(
        `/user?${shareRoomObj.userToShareId}`
      );
      const newMember = await newMemberResponse.json<User>();

      room.members.push({
        id: newMember.id,
        name: newMember.name,
        picture: newMember.picture,
      });
      await state.storage.put(`room:${room.id}`, room);

      // Add room to new user's rooms
      await this.env.USER.fetch("/user/room", {
        method: "POST",
        body: JSON.stringify({
          id: newMember.id,
          room: room,
        }),
      });
    } catch (e) {
      return decorateResponse(
        "Error occurred when sharing room: " + (e as Error).message,
        400
      );
    }
  }
}
