import { axiosPublic, SIMULATE_URL } from "../config/axios";

export const getAttempts = async (id: string) => {
  const response = await axiosPublic.get(`${SIMULATE_URL}/${id}`);
  return response.data;
};

export const sendAttempt = async (email: string, userId: string) => {
  const response = await axiosPublic.post(`${SIMULATE_URL}/send`, {
    email,
    userId,
  });
  return response.data;
};

export const deleteAttempt = async (id: string) => {
  const response = await axiosPublic.delete(`${SIMULATE_URL}/${id}`);
  return response.data;
};
