import { useState } from "react";
import * as React from "react";
import { Button, Input } from "../common";
import {ILoginProps, ISignUpProps, signIn, signUp} from "../../api";
import { AxiosResponse } from "axios";

export type IProps = {
  onSubmit: (response: AxiosResponse<any, any>) => void
  type: "signin" | "signup";
};

export default function AuthForm({ onSubmit, type }: IProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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

    const typedAuthProps = isSignup ? formData as ISignUpProps : formData as ILoginProps;
    apiAuthFunction(typedAuthProps).then((response) => {
      onSubmit(response);
    }).catch((error) => {
      setError(error.response.data.errors[0]);
      console.error('Error fetching data: ', error.response.data.errors[0]);
      return;
    });
  };

  const switchFormSection = () => {
    if (isSignup) {
      return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account? <a href="/signin" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Login here</a>
        </p>
      );
    } else {
      return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account? <a href="/signup" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Sign up here</a>
        </p>
      );
    }
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {isSignup && (
        <Input
          label="Name"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      <Input
        label="Email"
        id="email"
        name="email"
        placeholder="name@company.com"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        label="Password"
        id="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
      />
      {isSignup && (
        <Input
          type="password"
          label="Confirm Password"
          id="confirm_password"
          name="confirm_password"
          placeholder="••••••••"
          value={formData.confirm_password}
          onChange={handleChange}
        />
      )}
      <Button
        type="submit"
        text={isSignup ? "Create an account" : "Sign in"}
      />
      { switchFormSection() }
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
