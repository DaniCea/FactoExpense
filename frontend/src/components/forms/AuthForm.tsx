import { useState } from "react";
import * as React from "react";
import { Button, Input } from "../common";
import { IAuthResponse, ISignUpProps, signIn, signUp } from "../../api";

export interface IProps {
  onSubmit: (response: IAuthResponse) => void
  type: "signin" | "signup";
}

export interface IFormData {
  name?: string,
  email?: string,
  password?: string,
  confirm_password?: string,
}

export default function AuthForm({ onSubmit, type }: IProps) {
  const [formData, setFormData] = useState<IFormData>({});

  const [error, setError] = useState<string | null>(null);
  const isSignup = type === "signup";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apiAuthFunction = isSignup ? signUp : signIn;

    if (isSignup && (!formData.name || !formData.email || !formData.password || !formData.confirm_password)) {
      setError("All fields are required");
      return
    }

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address");
      return;
    }

    if (isSignup && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const { confirm_password: _, ...dataToSend } = formData;
    apiAuthFunction(dataToSend as ISignUpProps).then((response) => {
      debugger;
      onSubmit(response);
    }).catch((error) => {
      debugger;
      setError(error.response.data.errors[0]);
      console.error('Error fetching data: ', error.response.data.errors[0]);
      return;
    });
  };

  const switchFormSection = () => {
    const linkText = isSignup ? "Login here" : "Sign up here";
    const redirectText = isSignup ? "Already have an account?" : "Don’t have an account?";
    const redirectLink = isSignup ? "/signin" : "/signup";

    return (
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {redirectText} <a href={redirectLink} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">{linkText}</a>
      </p>
    );
  };

  const renderInput = (label: string, name: string, type: string, placeholder: string) => (
    <Input
      label={label}
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {isSignup && renderInput("Name", "name", "text", "Name")}
      {renderInput("Email", "email", "email", "name@company.com")}
      {renderInput("Password", "password", "password", "••••••••")}
      {isSignup && renderInput("Confirm Password", "confirm_password", "password", "••••••••")}
      {error && <p className="text-red-500">{error}</p>}
      <Button
        type="submit"
        text={isSignup ? "Create an account" : "Sign in"}
      />
      { switchFormSection() }
    </form>
  );
}
