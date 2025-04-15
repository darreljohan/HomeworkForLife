import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url?.includes("/auth/refresh")
    ) {
      console.log(originalRequest._retry);
      originalRequest._retry = true;

      try {
        const result = await apiClient.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", result.data.data.accessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        const retry = await apiClient(originalRequest);
        return retry;
      } catch (refreshError) {
        // If the refresh token is invalid, reject the promise
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
