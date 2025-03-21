import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router";

import { AuthForm } from "../components";
import { CenterGreyBackgroundLayout } from "./layouts";
import { IAuthResponse } from "../api";

export enum AuthType {
  SIGNIN = "signin",
  SIGNUP = "signup",
}

interface ISigninPageProps {
  type: AuthType
}

function AuthPage({ type }: ISigninPageProps) {
  const isSignup = type === AuthType.SIGNUP;
  const signInAuth = useSignIn()
  const navigate = useNavigate();

  const handleAuthSubmit = (response: IAuthResponse) => {
    if(signInAuth({
      auth: {
        token: response.token,
        type: 'Bearer',
      },
      userState: { ...response.user }
    })){
      navigate('/');
    } else {
      throw new Error('Failed to sign in');
    }
  }

  return (
    <CenterGreyBackgroundLayout verticalCenter>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {isSignup ? "Create an account" : "Sign in"}
      </h1>
      <AuthForm onSubmit={handleAuthSubmit} type={type}/>
    </CenterGreyBackgroundLayout>
  );
}

export default AuthPage;