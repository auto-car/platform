import { decorateResponse } from "./decorateResponse";
import {
  DatasetCollection,
  RDataset,
  RDatasetCollection,
  User,
} from "@platform/model";
import { Env } from ".";

const R_BASE_URL = "https://lionfish-app-ofc6e.ondigitalocean.app";

export class StorageDO {
  state: DurableObjectState;
  env: Env;
  analysisService: AnalysisService;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.analysisService = new AnalysisService(env);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR Analysis Worker: Alive and well!!",
          200
        );
      case "/collections":
        return this.analysisService.getCollectionsForTeam(request, this.state);
      case "/collection":
        return this.analysisService.getCollection(request, this.state);
      case "/admin":
        await this.state.storage.deleteAll();
        return decorateResponse("The deed is done.", 200);
      case "/upload":
        return this.analysisService.uploadDataset(request, this.state);
      case "/health-check":
        return this.analysisService.healthCheck();
      // case "/download-umap":
      //   return this.analysisService.getDatasetUMAP(request, this.state);
      default:
        return decorateResponse("Hmmm... endpoint doesn't exist!", 404);
    }
  }
}

class AnalysisService {
  env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async getCollectionsForTeam(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const teamId = url.searchParams.get("teamId");
      if (!teamId) {
        return decorateResponse("Error: id not provided", 400);
      }

      const allCollections = Array.from(
        (await state.storage.list<DatasetCollection | string>()).values()
      ).filter((data) => typeof data !== "string") as DatasetCollection[];

      return decorateResponse(
        JSON.stringify({
          collections: allCollections.filter(
            (collection) => collection.teamId === teamId
          ),
        }),
        200
      );
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error getting collections for team: ${e}` }),
        400
      );
    }
  }

  public async healthCheck() {
    const response = await fetch(`${R_BASE_URL}/`);
    const text = (await response.json<string[]>())[0];

    return decorateResponse(text, 200);
  }

  async createCollection(request: Request, state: DurableObjectState) {
    try {
      const collectionDefaults: DatasetCollection = {
        contentType: "data-collection",
        datasets: [],
        members: [],
        name: "",
        teamId: "",
      };

      const createCollectionArgs = await request.json<{
        collection: DatasetCollection;
        teamName: string;
      }>();

      const membersOfTeamRes = await this.env.TEAM.fetch(
        `http://team-worker.com/members?id=${createCollectionArgs.collection.teamId}`
      );
      const members = await membersOfTeamRes.json<{ members: User[] }>();
      const createdCollection = {
        ...collectionDefaults,
        ...createCollectionArgs,
        ...members,
      };
      const response = await fetch(
        `${R_BASE_URL}/collection?collection=${createdCollection.name}`
      );
      if (response.ok) {
        await state.storage.put(
          `collection::${createCollectionArgs.teamName}/${createdCollection.name}`,
          createdCollection
        );
        return decorateResponse(JSON.stringify(createdCollection), 200);
      }
      return decorateResponse(await response.text(), 400);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error creating collection for team: ${e}` }),
        400
      );
    }
  }

  public async getCollection(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const collection = url.searchParams.get("collection");
      if (!collection) {
        return decorateResponse("Error: collection not provided", 400);
      }
      const team = url.searchParams.get("team");
      if (!team) {
        return decorateResponse("Error: team not provided", 400);
      }

      const response = await fetch(
        `${R_BASE_URL}/datasets?collection=${collection}`
      );
      const collectionRes = await response.json<RDatasetCollection>();
      const collectionObj = await state.storage.get<DatasetCollection>(
        `collection::${team}/${collectionRes.name}`
      );
      return decorateResponse(JSON.stringify(collectionObj), 200);
    } catch (e) {
      return decorateResponse(
        JSON.stringify({ error: `Error getting collections for team: ${e}` }),
        400
      );
    }
  }

  public async uploadDataset(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const name = url.searchParams.get("name");
      const collection = url.searchParams.get("collection");
      const team = url.searchParams.get("team");
      const userId = url.searchParams.get("userId");
      if (!(await state.storage.get(`collection::${team}/${collection}`))) {
        return decorateResponse(
          "Error: collection does not exist in team",
          400
        );
      }

      const formData = await request.formData();
      const response = await fetch(
        `${R_BASE_URL}/upload-10X?name=${name}&collection=${collection}&team=${team}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const success = await response.text();
      if (response.ok) {
        const rDataset = await response.json<RDataset>();
        // Add dataset to collection and update the datasets attribute
        const collectionObj = await state.storage.get<DatasetCollection>(
          `collection::${team}/${collection}`
        );
        if (collectionObj) {
          const createdByRes = await this.env.USER.fetch(
            `http://user-worker.com/user?${userId}`
          );
          const user = await createdByRes.json<User>();

          collectionObj.datasets.push({
            createdAt: Date.now().toString(),
            createdBy: user,
            files: rDataset.files,
            hasOutput: rDataset.hasOutput[0],
            name: rDataset.name[0],
            totalSize: rDataset.totalSize[0],
            updatedAt: Date.now().toString(),
          });
          await state.storage.put(
            `collection::${team}/${collection}`,
            collectionObj
          );
          return decorateResponse(success, 200);
        }
      }
      return decorateResponse(success, 400);
    } catch (e) {
      return decorateResponse(
        "An error occurred :(" + (e as Error).message,
        400
      );
    }
  }

  // public async getDatasetUMAP(request: Request, state: DurableObjectState) {
  //   try {
  //     const url = new URL(request.url);
  //     const datasetName = url.searchParams.get("datasetName");
  //     if (datasetName) {
  //       const imageURL = await state.storage.get(`${datasetName}:umap-image`);
  //       if (imageURL) {
  //         return decorateResponse(
  //           JSON.stringify({ url: imageURL, datasetName }),
  //           200
  //         );
  //       }
  //       const response = await fetch(
  //         `${R_BASE_URL}/download-umap?dataset=${encodeURI(
  //           datasetName || ""
  //         )}`
  //       );
  //       if (response.ok) {
  //         const blob = await response.blob();
  //         const formData = new FormData();
  //         formData.append("image", blob);
  //         const uploadResponse = await fetch(
  //           `https://api.imgbb.com/1/upload?key=c20a0370273023e86c99b5f48a9a1267&name=${datasetName}`,
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         );

  //         const uploadedData = await uploadResponse.json<{
  //           data: { url: string };
  //         }>();
  //         await state.storage.put(
  //           `${datasetName}:umap-image`,
  //           uploadedData.data.url
  //         );

  //         return decorateResponse(
  //           JSON.stringify({ url: uploadedData.data.url, datasetName }),
  //           200
  //         );
  //       }
  //       return decorateResponse("Error occurred when getting image", 400);
  //     }
  //     return decorateResponse("Error: please provide dataset name", 400);
  //   } catch (e) {
  //     return decorateResponse(
  //       "An error occurred :(" + (e as Error).message,
  //       400
  //     );
  //   }
  // }
}
