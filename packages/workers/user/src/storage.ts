import { decorateResponse } from "./decorateResponse";
import { User } from "@platform/model";

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
          default:
            return decorateResponse("Base user endpoint", 200);
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

      return decorateResponse("Successfully created user!", 200);
    } catch (e) {
      return decorateResponse(
        "Error occurred when creating user: " + (e as Error).message,
        400
      );
    }
  }
}
