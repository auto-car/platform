import { User } from "../user/user";

/**
 * A collection of datasets
 */
export interface DatasetCollection {
  /**
   * Name of this dataset collection
   */
  name: string;
  /**
   * Datasets in this category
   */
  datasets: Dataset[];
  /**
   * Users who have created or modified any dataset in this collection
   */
  members: User[];
  /**
   * Content type field for the frontend.
   */
  contentType: "data-collection";
  /**
   * The team this collection belongs to
   */
  teamId: string;
}

/**
 * An R collection of datasets
 */
export interface RDatasetCollection {
  /**
   * Name of this dataset collection
   */
  name: string;
  /**
   * Datasets in this category
   */
  datasets: RDataset[];
}

/**
 * Dataset Model
 */
export interface Dataset {
  /**
   * Name of this dataset
   */
  name: string;
  /**
   * Time this dataset was created
   */
  createdAt: string;
  /**
   * Time this dataset was updated
   */
  updatedAt: string;
  /**
   * Flag telling us if we already generated output for this dataset
   */
  hasOutput: boolean;
  /**
   * Files that are in this dataset. TODO: change to File type.
   */
  files: string[];
  /**
   * Total size in mb of this dataset
   */
  totalSize: number;
  /**
   * User who uploaded this dataset
   */
  createdBy: User;
}

/**
 * RDataset Model
 */
export interface RDataset {
  /**
   * Name of this dataset
   */
  name: string[];
  /**
   * Flag telling us if we already generated output for this dataset
   */
  hasOutput: boolean[];
  /**
   * Files that are in this dataset. TODO: change to File type.
   */
  files: string[];
  /**
   * Total size in mb of this dataset
   */
  totalSize: number[];
}
