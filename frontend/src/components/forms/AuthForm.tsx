import { useState } from "react";
import * as React from "react";
import { Button, Input } from "../common";

export type IProps = {
  onSubmit: (formData: Record<string, string>) => void;
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    onSubmit(formData);
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
