import { AuthForm } from "../components";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router";
import { CenterGreyBackgroundLayout } from "./layouts";
import { AxiosResponse } from "axios";

interface ISigninPageProps {
  type: 'signin' | 'signup';
}

function AuthPage({ type }: ISigninPageProps) {
  const isSignup = type === 'signup';
  const signInAuth = useSignIn()
  const navigate = useNavigate();

  const handleAuthSubmit = (response: AxiosResponse<any, any>) => {
    if(signInAuth({
      auth: {
        token: response.data.token,
        type: 'Bearer',
      },
      userState: { user: response.data.user }
    })){
      navigate('/');
    } else {
      throw new Error('Failed to sign in');
    }
  }

  return (
    <CenterGreyBackgroundLayout centered>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {isSignup ? "Create an account" : "Sign in"}
      </h1>
      <AuthForm onSubmit={handleAuthSubmit} type={type}/>
    </CenterGreyBackgroundLayout>
  );
}

export default AuthPage;