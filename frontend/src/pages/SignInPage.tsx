import { AuthForm } from "../components";
import { ILoginProps, signIn } from "../api";

function SignInPage() {
  const handleSignIn = (formData: FormData) => {
    const loginProps: ILoginProps = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string
    }

    debugger;

    signIn(loginProps).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2>SIGN IN</h2>
        <AuthForm onSubmit={handleSignIn}/>
      </div>
    </section>
  );
}

export default SignInPage;