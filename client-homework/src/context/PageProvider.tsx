import { ReactNode, useState } from "react";
import { pageContext } from "./PageContext";

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<string>("Home");

  function changePage(name: string) {
    console.log(`Changing page to ${name}`);
    setPage(name);
  }
  return (
    <pageContext.Provider value={{ page: page, setPage: changePage }}>
      {children}
    </pageContext.Provider>
  );
}

export default PageProvider;
