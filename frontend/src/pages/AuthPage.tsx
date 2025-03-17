import { AuthForm } from "../components";
import {ILoginProps, ISignUpProps, signIn, signUp} from "../api";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router";

interface ISigninPageProps {
  type: 'signin' | 'signup';
}

function AuthPage({ type }: ISigninPageProps) {
  const signInAuth = useSignIn()
  const navigate = useNavigate();

  const handleSignIn = (formData: FormData) => {
    const authProps: ILoginProps | ISignUpProps = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string
    }

    const apiAuthFunction = type === 'signin' ? signIn : signUp;

    apiAuthFunction(authProps).then((response) => {
      debugger;
      if(signInAuth({
        auth: {
          token: response.data.token,
          type: 'Bearer',
        },
        userState: { user: { email: authProps.email } }
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <AuthForm onSubmit={handleSignIn} type={type}/>
      </div>
    </section>
  );
}

export default AuthPage;