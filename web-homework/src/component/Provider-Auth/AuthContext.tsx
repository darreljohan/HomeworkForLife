import { createContext } from "react";
import { User } from "../../models/user";

export interface AuthContextType {
  user: User | undefined; // user can be either User or undefined
  logout: () => void;
  login: () => void;
}

export const authContext = createContext<AuthContextType>({
  user: undefined,
  logout: () => {},
  login: () => {},
});
