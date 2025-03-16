import { AuthForm } from "../components";
import { ISignUpProps, signUp } from "../api";
import useSignIn from 'react-auth-kit/hooks/useSignIn';

function SignUpPage() {
  const signIn = useSignIn()

  const handleSignUp = (formData: FormData) => {
    const signupProps: ISignUpProps = {
      name: 'TODO' as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string
    }

    signUp(signupProps).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2>SIGN UP</h2>
        <AuthForm onSubmit={handleSignUp}/>
      </div>
    </section>
  );
}

export default SignUpPage;