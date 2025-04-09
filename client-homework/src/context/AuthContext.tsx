import { createContext } from "react";
import { User } from "../models/user";

export interface AuthContextType {
  user: User | undefined; // user can be either User or undefined
  logout: () => void;
  login: (email: string, password: string) => void;
  registerUser: (email: string, password: string) => Promise<string>;
}

export const authContext = createContext<AuthContextType>({
  user: undefined,
  logout: () => {},
  login: () => {},
  registerUser: async () => {
    return "";
  },
});
