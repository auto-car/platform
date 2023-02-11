import { Identifiable } from "../traits/identifiable";
import { LiveList, LiveObject } from "@liveblocks/client";

enum MenuType {
  ANALYSE = "analyse",
  PREDICT = "predict",
  PRESENT = "present",
}

type AvailableColor = "green" | "violet" | "blue" | "orange" | "pink";

export interface RoomContent extends Identifiable {
  selectedScreen: LiveObject<{
    selectedScreen: MenuType;
  }>;
  annotations: LiveList<
    {
      x: number;
      y: number;
      comment: string;
      color: string;
    }[]
  >;
  availableColours: LiveList<AvailableColor>;
  selectedDataset: LiveObject<{ selectedDataset: string | null }>;
  loadingDatasetUMAP: LiveObject<{ loadingDatasetUMAP: boolean }>;
  datasetUmapURL: LiveObject<{ datasetUmapURL: string }>;
}
