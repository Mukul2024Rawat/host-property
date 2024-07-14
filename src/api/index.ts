import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const getApiUrl = (endpoint: string) => `${API_BASE_URL}/${API_VERSION}/${endpoint}`;

export const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (data: { email: string; password: string }) => {
  return api.post(getApiUrl("auth/login"), data);
};

export const register = (data: { name: string; email: string; phone: string; password: string }) => {
  return api.post(getApiUrl("register"), data);
};

export const fetchUserProfile = () => {
  return api.get(getApiUrl("user/profile"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateUserProfile = (data: { name: string; phone: string; profilePhoto: string }) => {
  return api.put(getApiUrl("user/profile"), data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changePassword = (data: { oldPassword: string; newPassword: string }) => {
  return api.put(getApiUrl("user/change-password"), JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const fetchUserBookings = () => {
  return 
  // api.put(getApiUrl("user/change-password"), {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // });
};

