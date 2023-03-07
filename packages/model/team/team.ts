import { Laboratory } from "lab/lab";
import { DatasetCollection } from "model";
import { User } from "../user/user";

/**
 * Data model for a team in AutoCAR
 */
export interface Team {
  /**
   * Name of the team
   */
  name: string;
  /**
   * Picture for the team. Image source URL for now.
   */
  picture: string;
  /**
   * Members of the team
   */
  members: User[];
  // /**
  //  * Dataset collections that the team own
  //  */
  // collections: DatasetCollection[];
  // /**
  //  * Laboratories that the team own. Note - lab
  //  * collections is a frontend UX concept (shared with me, etc)
  //  */
  // labs: Laboratory[];
  /**
   * Unique id for this team
   */
  id: string;
}
