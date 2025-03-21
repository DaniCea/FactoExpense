import axios from './axiosInstance';
import { AxiosResponse } from "axios";

// Request params POST /signin
export interface ILoginProps {
  email: string,
  password: string,
}

// Request params POST /signup
export interface ISignUpProps {
  name: string;
  email: string;
  password: string;
}

// Response for both POST /signin and POST /signup
export interface IAuthResponse {
  token: string,
  user: {
    email: string,
    name: string,
    role: string,
  }
}

export const signIn = async (loginProps: ILoginProps): Promise<IAuthResponse> => {
  const response: AxiosResponse<IAuthResponse> = await axios.post('/signin', loginProps);
  return response.data;
};

export const signUp = async (signupProps: ISignUpProps): Promise<IAuthResponse> => {
  const response: AxiosResponse<IAuthResponse> = await axios.post('/signup', { user: signupProps });
  return response.data;
};