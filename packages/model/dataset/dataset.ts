/**
 * Note: all of the single attribute fields are still an array because of R.
 * When using this model, simply access the 1st index.
 */

/**
 * DatasetCategory Model
 */
export interface DatasetCategory {
  /**
   * Name of this dataset category
   */
  category: string[];
  /**
   * Datasets in this category
   */
  datasets: Dataset[];
}

/**
 * Dataset Model
 */
export interface Dataset {
  /**
   * Name of this dataset
   */
  name: string[];
  /**
   * Time this dataset was created
   */
  createdAt: string[];
  /**
   * Time this dataset was updated
   */
  updatedAt: string[];
  /**
   * Flag telling us if we already generated output for this dataset
   */
  hasOutput: boolean[];
}
