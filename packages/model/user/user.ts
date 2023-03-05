import { Room } from "../rooms/room";
import { Identifiable } from "../traits/traits";

export interface User extends Identifiable {
  /**
   * Name of the user
   */
  name: string;
  /**
   * Email of the user
   */
  email: string;
  /**
   * Nickname for this user
   */
  nickname: string;
  /**
   * Picture for this user
   */
  picture: string;
  /**
   * Rooms that this user belongs to. May or may not own them.
   */
  labs: Room[];
}
