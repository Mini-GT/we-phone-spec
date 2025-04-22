import { useState } from "react";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { LoginRegisterFormProps } from "~/types/globals.type";

export default function LoginForm({ handleAuthMode }: LoginRegisterFormProps) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Logging in with:", loginFormData.email, loginFormData.password );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  return (
    <CardContent>
      <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={loginFormData.email}
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
            value={loginFormData.password}
            onChange={handleChange}
            required
            className="w-full mt-1"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-between items-center text-sm mb-4">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <Button type="submit" className="w-full mb-4 cursor-pointer">Login</Button>

        
      </form>
      <div className="mt-4 flex justify-center gap-2 text-sm text-nowrap">
        <span>Don't have an account?</span>
        <button 
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => handleAuthMode("register")}
        >
          Register
        </button> 
        <span> or </span>  
        <button 
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => handleAuthMode("verify")}
        >
          Verify
        </button>
      </div>
    </CardContent>
  );
}
