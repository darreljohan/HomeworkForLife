/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../models/user";
import { authContext } from "./AuthContext";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { useLoading } from "./LoadingContext";
import { ResponseError, ResponseErrorType } from "../error/ResponseError";
import { AuthResponse } from "../models/auth";
import { pageContext } from "./PageContext";
import { apiClient } from "../utils/axiosInstance";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userState, setUser] = useState<User | undefined>(undefined);
  const { setLoading, setMessage } = useLoading();
  const { setPage } = useContext(pageContext);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true); // Start loading
      try {
        await getUser(); // Wait for getUser to finish
      } catch (error) {
        console.error("Failed to initialize user:", error);
      } finally {
        setLoading(false); // Stop loading after getUser is done
      }
    };

    initializeUser();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);

      await apiClient.post("/auth/logout");
      localStorage.clear();
      setUser(undefined);
      setPage("home");
      setMessage("Logout successful", true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseErrorType;
        throw new ResponseError(errorResponse.error, errorResponse.message);
      } else {
        throw new ResponseError("Uncaught Error", "Unknown Mesage");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result: AxiosResponse<{ data: AuthResponse }> =
        await apiClient.post(`/auth/login`, {
          email: email,
          password: password,
        });
      const authResponse = result.data.data;
      const user = new User(
        authResponse.id,
        authResponse.email,
        authResponse.config?.displayName,
        dayjs(authResponse.config?.birthDate),
        Number(authResponse.config?.ageExpentancy) || 40
      );
      localStorage.setItem("token", authResponse.accessToken!);
      setUser(user);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseErrorType;
        throw new ResponseError(errorResponse.error, errorResponse.message);
      } else {
        throw new ResponseError("Uncaught Error", "Unknown Mesage");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    await setTimeout(() => {}, 1000);
    try {
      const result: AxiosResponse<{ data: AuthResponse }> =
        await apiClient.post(`/auth/register`, {
          email: email,
          password: password,
        });
      return result.data.data.email;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseErrorType;
        throw new ResponseError(errorResponse.error, errorResponse.message);
      } else {
        throw new ResponseError("Uncaught Error", "Unknown Message");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      const resultAccess: AxiosResponse<{ data: AuthResponse }> | void =
        await apiClient.get(`/auth`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      const authResponse = resultAccess!.data.data;
      const user = new User(
        authResponse.id,
        authResponse.email,
        authResponse.config?.displayName,
        dayjs(authResponse.config?.birthDate),
        authResponse.config?.ageExpentancy || 40
      );
      setUser(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseErrorType;
        throw new ResponseError(errorResponse.error, errorResponse.message);
      } else {
        setPage("home");
        throw new ResponseError("Uncaught Error", "Unknown Mesage");
      }
    }
  };

  return (
    <authContext.Provider
      value={{
        user: userState,
        logout: logout,
        login: login,
        registerUser: register,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
