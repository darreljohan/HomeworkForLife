import { createContext, useContext } from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string, status: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextProps | undefined>({
  isLoading: false,
  setLoading: () => {},
  setMessage: () => {},
});

//Custom Hooks for better code readability
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
