import { useState } from "react";
import * as React from "react";

export type IProps = {
  onSubmit: (formData: FormData) => void
  type: 'signin' | 'signup';
}

export type ILoginProps = {
  email: string;
  password: string;
}

export type ISignUpProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function AuthForm({ onSubmit, type }: IProps) {
  const [error, setError] = useState<string | null>(null); // Only needed for error messages
  const isSignup = type === 'signup';

  const handleSubmit = (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    onSubmit(formData);
  };

  const switchFormSection = () => {
    if (isSignup) {
      return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account? <a href="signin" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Login here</a>
        </p>
      );
    } else {
      return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account? <a href="signup" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Sign up here</a>
        </p>
      );
    }
  }

  return (
    <div
      className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          { isSignup ? "Create an account" : "Sign in" }
        </h1>
        <form className="space-y-4 md:space-y-6" action={handleSubmit}>
          {isSignup && (
            <div>
              <label htmlFor="name"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="name" id="name"
                     placeholder="name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required/>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
              email</label>
            <input type="email" name="email" id="email"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="name@company.com" required/>
          </div>
          <div>
            <label htmlFor="password"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required/>
          </div>
          {isSignup && (
            <div>
              <label htmlFor="confirm-password"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                password</label>
              <input type="password" name="confirm_password" id="confirm_password"
                     placeholder="••••••••"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required/>
            </div>
          )}
          <button type="submit"
                  className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            { isSignup ? "Create an account" : "Sign in" }
          </button>
          { switchFormSection() }
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}