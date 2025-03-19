import { AuthForm } from "../components";
import { ILoginProps, ISignUpProps, signIn, signUp } from "../api";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router";
import { CenterGreyBackgroundLayout } from "./layouts";

interface ISigninPageProps {
  type: 'signin' | 'signup';
}

function AuthPage({ type }: ISigninPageProps) {
  const isSignup = type === 'signup';
  const signInAuth = useSignIn()
  const navigate = useNavigate();

  const handleAuthSubmit = (authProps: ILoginProps | ISignUpProps) => {
    const apiAuthFunction = isSignup ? signUp : signIn;
    const typedAuthProps = isSignup ? authProps as ISignUpProps : authProps as ILoginProps;

    apiAuthFunction(typedAuthProps).then((response) => {
      if(signInAuth({
        auth: {
          token: response.data.token,
          type: 'Bearer',
        },
        userState: { user: { email: authProps.email, role: response.data.user.role } }
      })){
        navigate('/');
      } else {
        throw new Error('Failed to sign in');
      }
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }

  return (
    <CenterGreyBackgroundLayout>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {isSignup ? "Create an account" : "Sign in"}
      </h1>
      <AuthForm onSubmit={handleAuthSubmit} type={type}/>
    </CenterGreyBackgroundLayout>
  );
}

export default AuthPage;