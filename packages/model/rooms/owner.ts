import { Identifiable } from "../traits/traits";

export interface Owner extends Identifiable {
  /**
   * Name of this owner
   */
  name: string;
  /**
   * Picture of the owner
   */
  picture: string;
}
