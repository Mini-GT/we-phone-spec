import { useState } from "react";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { LoginRegisterFormProps } from "~/types/globals.type";
import authService from "~/services/auth.service";

export default function RegisterForm({ handleAuthMode }: LoginRegisterFormProps) {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!registerFormData.name || !registerFormData.email || !registerFormData.password) {
      setError("All fields are required.");
      return;
    }

    // backend API call
    try {
      const data = await authService.register({...registerFormData});
      console.log(registerFormData)
      if (!data) throw new Error("Something went wrong");

      setSuccess("Account created successfully!");
      setRegisterFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError("Failed to create account.");
    }
  };

  return (
    <CardContent>
      <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
      <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="name"
            value={registerFormData.name}
            onChange={handleChange}
            required
            className="w-full mt-1"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={registerFormData.email}
            onChange={handleChange}
            required
            className="w-full mt-1"
            placeholder="name@email.com"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={registerFormData.password}
            onChange={handleChange}
            required
            className="w-full mt-1"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
            value={registerFormData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-1"
            placeholder="Confirm Password"
          />
        </div>
        <Button type="submit" className="w-full mb-4 cursor-pointer">Register</Button>
      </form>
      <div className="mt-4 flex justify-center gap-2 text-sm text-nowrap">
        <span>Have an account?</span>
        <button 
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => handleAuthMode("login")}
        >
          Login
        </button>
      </div>
    </CardContent>
  );
}
