import axios from './axiosInstance';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useEffect } from "react";

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
  // const signIn = useSignIn()

  debugger;

  try {
    await axios.post('/signin', loginProps).then((res) => {
      debugger;
      if (res.status === 200) {
        console.log(res);
      }
    })
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
};

export const signUp = async () => {
  try {
    return await axios.get('');
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
};