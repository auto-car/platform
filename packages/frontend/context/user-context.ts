import { User } from "@platform/model";
import React, { Dispatch } from "react";

export interface IUserContext {
  user: User;
  userDispatch: Dispatch<{
    type: DispatchAction;
    payload: any;
  }>;
}

const emptyUser: User = {
  email: "",
  id: "",
  name: "",
  nickname: "",
  picture: "",
  rooms: [],
};

export const initUser = emptyUser;

type DispatchAction = "login" | "logout" | "rooms";

export const UserContext = React.createContext<IUserContext>({
  user: emptyUser,
  userDispatch: () => {},
});

export const userReducer = (
  state: User,
  action: { type: DispatchAction; payload: any }
) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...action.payload,
      };
    case "logout":
      return {
        ...emptyUser,
      };
    case "rooms":
      return {
        ...state,
        rooms: action.payload.rooms,
      };
  }
};
