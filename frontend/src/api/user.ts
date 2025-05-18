import axios from "axios";
import type { UserDraft } from "../features/features/authSlice";
import {
  axiosPrivate,
  axiosPublic,
  MANAGE_URL,
  SIMULATE_URL,
} from "../config/axios";

export const createUser = async (user: UserDraft) => {
  const response = await axiosPublic.post(`${MANAGE_URL}/register`, user);
  return response.data;
};

export const loginUser = async (user: UserDraft) => {
  const response = await axiosPublic.post(`${MANAGE_URL}/login`, user);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosPrivate.post(`${MANAGE_URL}/logout`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosPrivate.get(`${MANAGE_URL}/refresh`);

  return response.data;
};
