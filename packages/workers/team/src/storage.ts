import { decorateResponse } from "./decorateResponse";
import { Team, User } from "@platform/model";
import { Env } from ".";

export class StorageDO {
  state: DurableObjectState;
  teamService: TeamService;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.teamService = new TeamService(env);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR Team Worker: Alive and well!!",
          200
        );
      case "/admin":
        this.state.storage.deleteAll();
        return decorateResponse("The deed is done.", 200);
      case "/team":
        switch (request.method) {
          case "POST":
            return this.teamService.createTeam(request, this.state);
          default:
            return decorateResponse("/team endpoint", 200);
        }
      case "/members":
        return this.teamService.getTeamMembers(request, this.state);
      default:
        return decorateResponse("Endpoint not found...", 404);
    }
  }
}

class TeamService {
  env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async createTeam(request: Request, state: DurableObjectState) {
    try {
      const teamDefaults: Team = {
        members: [],
        name: "",
        picture: "",
        id: crypto.randomUUID(),
      };

      const createTeamArgs = await request.json<Team>();
      if (await state.storage.get(`team::${createTeamArgs.id}`)) {
        return decorateResponse(
          JSON.stringify({ error: "Team with this id already exists!" }),
          400
        );
      }
      if (await state.storage.get(`team::${createTeamArgs.name}`)) {
        return decorateResponse(
          JSON.stringify({ error: "Team with this name already exists!" }),
          400
        );
      }
      const createdTeam = { ...teamDefaults, ...createTeamArgs };
      await state.storage.put(`team::${createdTeam.id}`, createdTeam);
      return decorateResponse("Success!", 200);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error creating team: ${e}` }),
        400
      );
    }
  }

  async addUserToTeam(request: Request, state: DurableObjectState) {
    try {
      const userAndTeamIds = await request.json<{
        user: string;
        team: string;
      }>();
      const userExists = await this.env.USER.fetch(
        `https://service-binding/user?id=${userAndTeamIds.user}`
      );
      if (userExists.status !== 200) {
        return decorateResponse(await userExists.text(), 400);
      }
      const user = await userExists.json<User>();
      const team = await state.storage.get<Team>(
        `team::${userAndTeamIds.team}`
      );
      if (!team) {
        return decorateResponse(
          JSON.stringify({
            error: `Error: team with id ${userAndTeamIds.team} does not exist`,
          }),
          400
        );
      }
      team.members.push(user);
      await state.storage.put(`team::${team.id}`, team);
      await state.storage.put(`team::${team.name}`, team);
      await this.env.USER.fetch("https://service-binding/user/team", {
        method: "POST",
        body: JSON.stringify({ id: user.id, team }),
      });

      return decorateResponse("Successfully added user to team!", 200);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error adding user: ${e}` }),
        400
      );
    }
  }

  async getTeamMembers(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const teamId = url.searchParams.get("id");
      if (!teamId) {
        return decorateResponse("Error: id not provided", 400);
      }
      const team = await state.storage.get<Team>(`team::${teamId}`);
      if (!team) {
        return decorateResponse(
          `Error: team with id ${teamId} does not exist`,
          400
        );
      }
      return decorateResponse(JSON.stringify({ members: team.members }), 200);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error getting members: ${e}` }),
        400
      );
    }
  }
}
