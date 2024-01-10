import axios from "axios";
import { local } from "./localStorage";

type SendRequestRequirements = {
  route: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: {};
};

axios.defaults.baseURL = "http://localhost:8000/";

export const sendRequest = async ({
  route,
  method = "GET",
  body,
}: SendRequestRequirements) => {
  const token = local("token");

  const authorizationHeader = `Bearer ${token}`;
  try {
    const response = await axios.request({
      url: route,
      method,
      data: body,
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("Network error. Please try again.");
    } else {
      throw error;
    }
  }
};
export const sendFileRequest = async ({
  route,
  method = "GET",
  body,
}: SendRequestRequirements) => {
  const token = local("token");

  const authorizationHeader = `Bearer ${token}`;
  try {
    const response = await axios.request({
      url: route,
      method,
      data: body,
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "multipart/form-data"
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("Network error. Please try again.");
    } else {
      throw error;
    }
  }
};
