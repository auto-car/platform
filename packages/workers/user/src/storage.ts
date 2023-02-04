import { decorateResponse } from "./decorateResponse";
import { Room, User } from "@platform/model";

export class StorageDO {
  state: DurableObjectState;
  userService: UserService;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.userService = new UserService();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR User Worker: Alive and well!!",
          200
        );
      case "/user":
        switch (request.method) {
          case "POST":
            return this.userService.createUser(request, this.state);
          case "GET":
            return this.userService.getUserById(request, this.state);
          default:
            return decorateResponse("Base user endpoint", 200);
        }
      case "/user/rooms":
        return this.userService.getUserRooms(request, this.state);
      case "/user/room":
        switch (request.method) {
          case "POST":
            return this.userService.addRoomToUser(request, this.state);
          default:
            return decorateResponse("Base /user/room endpoint", 200);
        }
      case "/users":
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

class UserService {
  async getUserById(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("id");
      if (!userId) {
        return decorateResponse("Error: id not provided", 400);
      }
      console.log(userId);
      const user = await state.storage.get(`user:${userId}`);
      if (!user) {
        return decorateResponse(
          "Error: user with given id does not exist.",
          400
        );
      }
      return decorateResponse(JSON.stringify(user), 200);
    } catch (e) {
      return decorateResponse("Error occurred when getting user by id", 400);
    }
  }

  async createUser(request: Request, state: DurableObjectState) {
    try {
      const userDefaults: User = {
        email: "",
        id: crypto.randomUUID(),
        name: "",
        nickname: "",
        picture: "",
        rooms: [],
      };

      const user = await request.json<Partial<User>>();
      const createdUserObj: User = { ...userDefaults, ...user };
      // Check if user entry exists of this email already
      const existingObj = await state.storage.get<User>(
        `user:${createdUserObj.email}`
      );
      if (existingObj) {
        return decorateResponse("User already exists, completing login!", 200);
      }
      // Add user to storage, indexes of id and email
      await state.storage.put(`user:${createdUserObj.id}`, createdUserObj);
      await state.storage.put(`user:${createdUserObj.email}`, createdUserObj);

      return decorateResponse(JSON.stringify(createdUserObj), 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when creating user: " + (e as Error).message,
        400
      );
    }
  }

  async addRoomToUser(request: Request, state: DurableObjectState) {
    try {
      const addRoomObj = await request.json<{ id: string; room: Room }>();
      // Check user exists
      const user = await state.storage.get<User>(`user:${addRoomObj.id}`);
      if (!user) {
        return decorateResponse("Error: user does not exist", 400);
      }

      // Add room
      user.rooms.push(addRoomObj.room);
      await state.storage.put(`user:${user.id}`, user);
      return decorateResponse("Successfully added room for user", 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when adding room for user: " + (e as Error).message,
        400
      );
    }
  }

  async getUserRooms(request: Request, state: DurableObjectState) {
    try {
      const userRoomsObj = await request.json<{ id: string }>();
      // Check user exists
      const user = await state.storage.get<User>(`user:${userRoomsObj.id}`);
      if (!user) {
        return decorateResponse("Error: user does not exist", 400);
      }

      // Return rooms
      return decorateResponse(JSON.stringify(user.rooms), 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when getting rooms for user: " + (e as Error).message,
        400
      );
    }
  }
}
