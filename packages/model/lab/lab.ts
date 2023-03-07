import { User } from "../user/user";

/**
 * Model for a lab in AutoCAR
 */
export interface Laboratory {
  /**
   * Name of the lab
   */
  name: string;
  /**
   * Members who have access to the lab (all in the team for now)
   */
  members: User[];
  /**
   * Description for this lab
   */
  description: string;
  /**
   * Auto-generated id for the lab
   */
  id: string;
  /**
   * Last modified/updated time for this lab
   */
  updatedAt: Date;
  /**
   * The team this lab belongs to
   */
  teamId: string;
}
