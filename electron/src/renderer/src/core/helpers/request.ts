import axios from "axios";
import { local } from "./localStorage";

type SendRequestRequirements = {
  route: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: {};
};

export const sendRequest = async ({
  route,
  method = "GET",
  body,
}: SendRequestRequirements) => {
  const token = local("token");
  const baseURL = `http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:80/`
  const authorizationHeader = `Bearer ${token}`;
  try {
    const response = await axios.request({
      url: route,
      method,
      data: body,
      baseURL,
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
  const baseURL = `http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:80/`
  const authorizationHeader = `Bearer ${token}`;
  try {
    const response = await axios.request({
      url: route,
      method,
      data: body,
      baseURL,
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
export const messagesRequest = async ({
  route,
  method = "GET",
  body,
}: SendRequestRequirements) => {
  const token = local("token");
  const baseURL = `http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:443`
  // const baseURL = `http://localhost:5000`
  const authorizationHeader = `Bearer ${token}`;
  try {
    const response = await axios.request({
      url: route,
      method,
      data: body,
      baseURL,
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