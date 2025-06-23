import { useEffect, useState } from "react";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { LoginRegisterFormProps } from "~/types/globals.type";
import authService from "~/services/auth.service";
import { usePopupButton } from "~/context/popupButtonContext";
import { AxiosError } from 'axios';
import { NavLink, redirect, useNavigate } from "react-router";
import { requireAuthCookie } from "~/utils/auth";
import { useAuth } from "~/context/authContext";

export default function LoginForm({ handleAuthMode }: LoginRegisterFormProps) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { setPopupButton } = usePopupButton()
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      // handleLogin(loginFormData);
      const response = await authService.login({ ...loginFormData });
      
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user)
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: false,
      }))
      setLoginFormData({ email: "", password: "" });
      // navigate(0);
    } catch (error) {
      if(error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
      console.error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
  
      return () => clearTimeout(timer)
    }
  }, [error]);

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
        {error && <p className="text-[red] text-sm ">{error}</p>}
        <Button 
          type="submit" 
          className="w-full mb-4 cursor-pointer"
        >
          Login
        </Button>
        <div className="flex items-center border-1 rounded-md cursor-pointer gap-2">
          <img className="w-9 rounded-full" src="/imgs/google.png" alt="google" />
          <a href="http://localhost:3000/auth/google">
            Continue with Google
          </a>
          
        </div>
        
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
