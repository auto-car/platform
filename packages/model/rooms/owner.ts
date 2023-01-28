import { Identifiable } from "../traits/traits";

export interface Owner extends Identifiable {
  /**
   * Name of this owner
   */
  name: string;
}
