import axios from './axiosInstance';

export type ILoginProps = {
  email: string;
  password: string;
  confirm_password: string;
}

export type ISignUpProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const signIn = async (loginProps: ILoginProps) => {
  try {
    return await axios.post('/signin', loginProps);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (signupProps: ISignUpProps) => {
  try {
    return await axios.post('/signup', {
      user: signupProps
    })
  } catch (error) {
    throw error;
  }
};