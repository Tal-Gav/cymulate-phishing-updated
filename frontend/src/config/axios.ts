import axios from "axios";
import { store } from "../features/store";
import { refreshTokenThunk } from "../features/features/authSlice";

export const SIMULATE_URL = "http://localhost:3000/phishing";
export const MANAGE_URL = "http://localhost:5000/user";

export const axiosPublic = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 👇 Attach interceptors immediately
axiosPrivate.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const dispatch = store.dispatch;

      const resultAction = await dispatch(refreshTokenThunk());

      const newAccessToken = resultAction.payload?.accessToken;
      if (!newAccessToken) return Promise.reject(error);

      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }

    return Promise.reject(error);
  }
);
