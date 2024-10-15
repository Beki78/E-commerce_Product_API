import api from "./axios";
import { ProductType, FormType } from "../types/types";
import { AxiosError } from "axios";

const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";

export const loginApi = async (credentials: {
  email: string;
  password: string;
}): Promise<FormType> => {
  try {
    const response = await api.post(
      "http://127.0.0.1:8000/api-auth/login/",
      credentials
    );
    if (response) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      return response.data;
    }
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      throw new Error(`Failed to login, Status: ${axiosError.response.status}`);
    } else {
      throw new Error(`Failed to login, Status: unknown`);
    }
  }
};

export const fetchProductsApi = async (): Promise<ProductType[]> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      throw new Error(
        `Failed to fetch products, Status: ${axiosError.response.status}`
      );
    } else {
      throw new Error(`Failed to fetch products, Status: unknown`);
    }
  }
};
