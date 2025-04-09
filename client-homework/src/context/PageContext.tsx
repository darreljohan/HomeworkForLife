import { createContext } from "react";

export interface PageContextType {
  page: string;
  setPage: (name: string) => void;
}

export const pageContext = createContext<PageContextType>({
  page: "Home",
  setPage: () => {},
});
