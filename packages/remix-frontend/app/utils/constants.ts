import { type MenuPanelSectionProps } from "../components/menu-panel-section";
import { type Dataset, type User } from "@platform/model";

const mockDatasets: Dataset[] = [
  {
    name: "AbseqRNA_MolsPerCell",
    files: [],
    updatedAt: new Date(Date.now() - 400000).toString(),
    createdAt: new Date(Date.now() - 400000).toString(),
    hasOutput: false,
    totalSize: 95.67,
    createdBy: {
      email: "email",
      id: "id",
      name: "Bob",
      nickname: "",
      picture:
        "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
      teams: [],
    } as User,
  },
  {
    name: "Another Dataset",
    files: [],
    updatedAt: new Date(Date.now() - 400000).toString(),
    createdAt: new Date(Date.now() - 400000).toString(),
    hasOutput: false,
    totalSize: 95.67,
    createdBy: {
      email: "email",
      id: "id",
      name: "Bob",
      nickname: "",
      picture:
        "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
      teams: [],
    } as User,
  },
];

const mockMembers: User[] = [
  {
    email: "email",
    id: "id",
    name: "Bob",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    teams: [],
  },
  {
    email: "email",
    id: "id",
    name: "The",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    teams: [],
  },
  {
    email: "email",
    id: "id",
    name: "Builder",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    teams: [],
  },
  {
    email: "email",
    id: "id",
    name: "Hi",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    teams: [],
  },
];

const mockDataCollectionWithoutName: Omit<DataCollection, "name"> = {
  datasets: [
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
    ...mockDatasets,
  ],
  members: mockMembers,
  updatedAt: new Date(Date.now() - 1000000),
  contentType: "data-collection",
};

const mockDataCollections: DataCollection[] = [
  {
    name: "UNSW Datasets",
    ...mockDataCollectionWithoutName,
  },
  {
    name: "Tutorial Work",
    ...mockDataCollectionWithoutName,
  },
  {
    name: "10X Datasets",
    ...mockDataCollectionWithoutName,
  },
];

export const mockLabs: LaboratoryProps[] = [
  {
    name: "Demo Lab",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "51f79e8e-346b-45a3-943e-3f2a2dfa5f36",
  },
  {
    name: "Lab 2",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "95f79e8e-346b-45a3-943e-3f2a2dfa5f36",
  },
  {
    name: "New-ish Lab",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "cb78d5ff-84ce-445d-af1b-a07a4f9137b6",
  },
];

const mockLabsCategories: LabsCategory[] = [
  {
    name: "All Laboratories",
    labs: mockLabs,
    contentType: "lab",
    description:
      "View all labs accessible to you - includes labs either created by you, or shared with you.",
  },
  {
    name: "Created by Me",
    labs: mockLabs,
    contentType: "lab",
    description: "View all labs created by you.",
  },
  {
    name: "Shared with Me",
    labs: mockLabs,
    contentType: "lab",
    description: "View all labs shared with you.",
  },
];

export interface DataCollection {
  datasets: Dataset[];
  name: string;
  members: User[];
  updatedAt: Date;
  contentType: "data-collection";
}

export interface LaboratoryProps {
  name: string;
  members: User[];
  description: string;
  id: string;
  updatedAt: Date;
}

export interface LabsCategory {
  name: string;
  labs: LaboratoryProps[];
  contentType: "lab";
  description: string;
}

export const mockMenu: Pick<MenuPanelSectionProps, "type" | "items">[] = [
  {
    type: "data-collections",
    items: mockDataCollections,
  },
  {
    type: "labs",
    items: mockLabsCategories,
  },
];
