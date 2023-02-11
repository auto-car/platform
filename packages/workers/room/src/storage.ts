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
          "🚀🚀 AutoCAR Room Worker: Alive and well!!",
          200
        );
      case "/admin":
        this.state.storage.deleteAll();
        return decorateResponse("The deed is done.", 200);
      case "/room":
        switch (request.method) {
          case "GET":
            return this.roomService.getRoomById(request, this.state);
          case "POST":
            return this.roomService.createRoom(request, this.state);
          default:
            return decorateResponse("Base room endpoint", 200);
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

  async getRoomById(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const roomId = url.searchParams.get("id");
      if (!roomId) {
        return decorateResponse("Error: id not provided", 400);
      }

      const room = await state.storage.get(`room:${roomId}`);
      if (!room) {
        return decorateResponse(
          "Error: room with id " + roomId + " does not exist",
          400
        );
      }

      return decorateResponse(JSON.stringify(room), 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when getting room: " + (e as Error).message,
        400
      );
    }
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
      // Check if room with this id already exists
      const existingObj = await state.storage.get<User>(`room:${room.id}`);
      if (existingObj) {
        return decorateResponse(
          "Error: Room with this id already exists.",
          400
        );
      }

      let createdRoomObj: Room = { ...roomDefaults, ...room };
      createdRoomObj = {
        ...createdRoomObj,
        members: [
          {
            id: createdRoomObj.owner.id,
            name: createdRoomObj.owner.name,
            picture: createdRoomObj.owner.picture,
          },
          ...createdRoomObj.members,
        ],
      };

      for (const member of createdRoomObj.members) {
        // Add this room record into all members' user records,
        // including the owner.
        const response = await this.env.USER.fetch(
          "https://service-binding/user/room",
          {
            method: "POST",
            body: JSON.stringify({
              id: member.id,
              room: createdRoomObj,
            }),
          }
        );

        if (!response.ok) {
          return decorateResponse(
            "Error occurred when creating room: " + (await response.text()),
            400
          );
        }
      }

      // Add room to storage with id index
      await state.storage.put(`room:${createdRoomObj.id}`, createdRoomObj);
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
      await this.env.USER.fetch("https://service-binding/user/room", {
        method: "POST",
        body: JSON.stringify({
          id: newMember.id,
          room: room,
        }),
      });
      return decorateResponse("Room shared successfully", 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when sharing room: " + (e as Error).message,
        400
      );
    }
  }
}
