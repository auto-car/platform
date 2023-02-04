import { User } from "user/user";
import { Identifiable } from "../traits/traits";
import { Owner } from "./owner";

export interface Room extends Identifiable {
  /**
   * Name of this room
   */
  name: string;
  /**
   * Owner of this room
   */
  owner: Owner;
  /**
   * Time that this room was created at
   */
  createdAt: Date;
  /**
   * Time that this room was last updated
   */
  updatedAt: Date;
  /**
   * Members of this room
   */
  members: RoomMember[];
  /**
   * TODO: introduce content of room somehow.
   */
}

export type RoomMember = Pick<User, "picture" | "id" | "name">;
