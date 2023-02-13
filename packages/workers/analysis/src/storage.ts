import { decorateResponse } from "./decorateResponse";
import { DatasetCategory } from "@platform/model";

export class StorageDO {
  state: DurableObjectState;
  analysisService: AnalysisService;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.analysisService = new AnalysisService();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/":
        return decorateResponse(
          "🚀🚀 AutoCAR Analysis Worker: Alive and well!!",
          200
        );
      case "/datasets":
        return this.analysisService.getDatasets();
      case "/upload":
        return this.analysisService.uploadDataset(request);
      case "/health-check":
        return this.analysisService.healthCheck();
      case "/download-umap":
        return this.analysisService.getDatasetUMAP(request, this.state);
      default:
        return decorateResponse("Hmmm... endpoint doesn't exist!", 404);
    }
  }
}

class AnalysisService {
  public async healthCheck() {
    const response = await fetch(
      "https://lionfish-app-ofc6e.ondigitalocean.app/"
    );
    const text = (await response.json<string[]>())[0];

    return decorateResponse(text, 200);
  }

  public async getDatasets() {
    const response = await fetch(
      "https://lionfish-app-ofc6e.ondigitalocean.app/datasets"
    );
    const datasets = await response.json<DatasetCategory[]>();

    return decorateResponse(JSON.stringify(datasets), 200);
  }

  public async uploadDataset(request: Request) {
    try {
      const url = new URL(request.url);
      const datasetName = url.searchParams.get("datasetName");
      const datasetCategory = url.searchParams.get("datasetCategory");
      const formData = await request.formData();
      const response = await fetch(
        `https://lionfish-app-ofc6e.ondigitalocean.app/upload-10X?dataset_name=${datasetName}&dataset_category=${datasetCategory}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const success = await response.text();
      if (response.ok) {
        return decorateResponse(success, 200);
      }
      return decorateResponse(success, 400);
    } catch (e) {
      return decorateResponse(
        "An error occurred :(" + (e as Error).message,
        400
      );
    }
  }

  public async getDatasetUMAP(request: Request, state: DurableObjectState) {
    try {
      const url = new URL(request.url);
      const datasetName = url.searchParams.get("datasetName");
      if (datasetName) {
        const imageURL = await state.storage.get(`${datasetName}:umap-image`);
        if (imageURL) {
          return decorateResponse(
            JSON.stringify({ url: imageURL, datasetName }),
            200
          );
        }
        const response = await fetch(
          `https://lionfish-app-ofc6e.ondigitalocean.app/download-umap?dataset=${encodeURI(
            datasetName || ""
          )}`
        );
        if (response.ok) {
          const blob = await response.blob();
          const formData = new FormData();
          formData.append("image", blob);
          const uploadResponse = await fetch(
            `https://api.imgbb.com/1/upload?key=c20a0370273023e86c99b5f48a9a1267&name=${datasetName}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadedData = await uploadResponse.json<{
            data: { url: string };
          }>();
          await state.storage.put(
            `${datasetName}:umap-image`,
            uploadedData.data.url
          );

          return decorateResponse(
            JSON.stringify({ url: uploadedData.data.url, datasetName }),
            200
          );
        }
        return decorateResponse("Error occurred when getting image", 400);
      }
      return decorateResponse("Error: please provide dataset name", 400);
    } catch (e) {
      return decorateResponse(
        "An error occurred :(" + (e as Error).message,
        400
      );
    }
  }
}
