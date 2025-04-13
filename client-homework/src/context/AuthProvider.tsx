import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../models/user";
import { authContext } from "./AuthContext";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { useLoading } from "./LoadingContext";
import { ResponseError, ResponseErrorType } from "../error/ResponseError";
import { AuthResponse, RefreshResponse } from "../models/auth";
import { pageContext } from "./PageContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userState, setUser] = useState<User | undefined>(undefined);
  const { setLoading, setMessage } = useLoading();
  const { setPage } = useContext(pageContext);

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      setUser(undefined);
      setPage("home");
      setMessage("Logout successful", true);
    } catch (error) {
      throw new ResponseError("Unknown error", "Unknown Message");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
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
      const result: AxiosResponse<{ data: AuthResponse }> = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email: email,
          password: password,
        }
      );
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

  const refreshToken = async () => {
    try {
      const result: AxiosResponse<{ data: RefreshResponse }> = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", result.data.data.accessToken);
      await getUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseErrorType;
        throw new ResponseError(errorResponse.error, errorResponse.message);
      } else {
        throw new ResponseError("Uncaught Error", "Unknown Message");
      }
    }
  };

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const resultAccess: AxiosResponse<{ data: AuthResponse }> | void =
        await axios.get(`${import.meta.env.VITE_API_URL}/auth`, {
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
        if (error.status === 401) {
          await refreshToken();
        }
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
