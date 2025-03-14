import { AuthForm } from "../components";

function SignInPage() {

  const handleSignIn = (formData: FormData) => {
    debugger;
    console.log(formData.get("email"))
    console.log(formData.get("password"))
    console.log(formData.get("confirm-password"))
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