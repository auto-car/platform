import { decorateResponse } from "./decorateResponse";
import { Laboratory, User } from "@platform/model";
import { Env } from ".";

export class StorageDO {
  state: DurableObjectState;
  labService: LabService;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.labService = new LabService(env);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR Lab Worker: Alive and well!!",
          200
        );
      case "/admin":
        this.state.storage.deleteAll();
        return decorateResponse("The deed is done.", 200);
      case "/lab":
        switch (request.method) {
          case "POST":
            return this.labService.createLab(request, this.state);
          default:
            return decorateResponse("/lab endpoint", 200);
        }
      case "/labs":
        return this.labService.getLabsForTeam(request, this.state);
      default:
        return decorateResponse("Endpoint not found...", 404);
    }
  }
}

class LabService {
  env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async createLab(request: Request, state: DurableObjectState) {
    try {
      const createLabDefaults: Laboratory = {
        description: "Enter description here...",
        id: crypto.randomUUID(),
        members: [],
        name: "Untitled",
        teamId: "",
        updatedAt: new Date(Date.now()),
      };

      const createLabArgs = await request.json<Laboratory>();
      const membersOfTeamRes = await this.env.TEAM.fetch(
        `http://team-worker.com/members?id=${createLabArgs.teamId}`
      );
      const members = await membersOfTeamRes.json<{ members: User[] }>();
      const createdLab = { ...createLabDefaults, ...createLabArgs, ...members };

      await state.storage.put(`lab::${createdLab.id}`, createdLab);
      return decorateResponse(JSON.stringify(createdLab), 200);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error creating new lab: ${e}` }),
        400
      );
    }
  }

  async getLabsForTeam(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const teamId = url.searchParams.get("teamId");
      if (!teamId) {
        return decorateResponse("Error: id not provided", 400);
      }

      const allLabs = Array.from(
        (await state.storage.list<Laboratory>()).values()
      );
      return decorateResponse(
        JSON.stringify({
          labs: allLabs.filter((lab) => lab.teamId === teamId),
        }),
        200
      );
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error getting labs for team: ${e}` }),
        400
      );
    }
  }
}
