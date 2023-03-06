import { type MenuPanelSectionProps } from "../components/menu-panel-section";
import { type User } from "@platform/model";
import { type DatasetProps } from "../components/datasets-card-view";

const mockDatasets = [
  {
    name: "AbseqRNA_MolsPerCell",
    files: [],
    updatedAt: new Date(Date.now() - 400000),
    totalSize: 95.67,
    uploadedBy: {
      email: "email",
      id: "id",
      name: "Bob",
      nickname: "",
      picture:
        "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
      labs: [],
    },
  },
  {
    name: "Another Dataset",
    files: [],
    updatedAt: new Date(Date.now() - 400000),
    totalSize: 95.67,
    uploadedBy: {
      email: "email",
      id: "id",
      name: "Bob",
      nickname: "",
      picture:
        "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
      labs: [],
    },
  },
];
const mockMembers = [
  {
    email: "email",
    id: "id",
    name: "Bob",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    labs: [],
  },
  {
    email: "email",
    id: "id",
    name: "The",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    labs: [],
  },
  {
    email: "email",
    id: "id",
    name: "Builder",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    labs: [],
  },
  {
    email: "email",
    id: "id",
    name: "Hi",
    nickname: "",
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZI-Xl_L0HQ75ed10bPoLmqzHePeptuYO95h4jnTw=s96-c",
    labs: [],
  },
];
const mockTeamWithoutName: Omit<Team, "name"> = {
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
  contentType: "team",
};
const mockTeams: Team[] = [
  {
    name: "UNSW Immunogenomics",
    ...mockTeamWithoutName,
  },
  {
    name: "Seurat",
    ...mockTeamWithoutName,
  },
  {
    name: "10X Genomics",
    ...mockTeamWithoutName,
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

export interface Team {
  datasets: DatasetProps[];
  name: string;
  members: User[];
  updatedAt: Date;
  contentType: "team";
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
    type: "teams",
    items: mockTeams,
  },
  {
    type: "labs",
    items: mockLabsCategories,
  },
];
