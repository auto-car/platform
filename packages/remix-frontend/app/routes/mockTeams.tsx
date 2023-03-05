import { LaboratoryProps } from "./home";
import { Team, LabsCategory } from "../utils/constants";

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
export const mockTeams: Team[] = [
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
const mockLabs: LaboratoryProps[] = [
  {
    name: "Demo Lab",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "id",
  },
  {
    name: "Demo Lab",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "id",
  },
  {
    name: "Demo Lab",
    updatedAt: new Date(Date.now() - 1000000),
    members: mockMembers,
    description: "Experimenting with the QC and UMAP features.",
    id: "id",
  },
];
export const mockLabsCategories: LabsCategory[] = [
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
