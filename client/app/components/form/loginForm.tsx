import { useEffect, useState } from "react";
import { type LoginRegisterFormProps } from "~/types/globals.type";
import authService from "~/services/auth.service";
import { usePopupButton } from "~/context/popupButtonContext";
import { Form, NavLink, redirect, useFetcher, useNavigate, useNavigation, useRevalidator } from "react-router";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "~/context/userContext";

export default function LoginForm({ handleAuthMode }: LoginRegisterFormProps) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { setPopupButton } = usePopupButton()
  const navigation = useNavigation()
  const { setUser } = useUser()
  const fetcher = useFetcher()
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await authService.login({ ...loginFormData });
    if(res.status === 400) {
      setError(res.message.message.password[0])
      setEmailError(res.message.message.email[1] ?? res.message.message.email[0])
    } 
    else if(res.status === 401) {
      setError(res.message.message)
    } 
    else {
      const { accessToken, refreshToken, userData } = res
      fetcher.submit(
        { tokenData: JSON.stringify({accessToken, refreshToken })},
        { action: "/", method: "post" }
      )
      setUser(userData)
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: false,
      }))
      setLoginFormData({ email: "", password: "" });
      redirect("/")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
        setEmailError(null)
      }, 2000);
  
      return () => clearTimeout(timer)
    }
  }, [error]);

  return (
    <CardContent>
      <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
      <Form method="POST" onSubmit={handleSubmit} className="mt-4">
        <div className="relative mb-4">
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
          {emailError && <p className="absolute text-[red] text-xs">{emailError}</p>}
        </div>
        <div className="relative mb-4">
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
          {error && <p className="absolute text-[red] text-xs">{error}</p>}
        </div>
        <div className="flex justify-between items-center text-sm mb-4">
          <NavLink 
            to="/password/forgot" 
            className="text-blue-600 hover:underline"
            onClick={() => setPopupButton(prevState => ({
              ...prevState,
              isLoginClicked: false,
            }))}
          >
            Forgot Password?
          </NavLink>
        </div>
        <Button
          type="submit" 
          className="w-full mb-4 cursor-pointer"
        >
          {navigation.state === "loading"
          ? "Submitting..."
          : "Submit"}
          {/* Login */}
        </Button>
        <div className="flex items-center border-1 rounded-md cursor-pointer gap-2">
          <img className="w-9 rounded-full" src="/imgs/google.png" alt="google" />
          <a href="http://localhost:3000/auth/google">
            Continue with Google
          </a>
        </div>
        
      </Form>
      <div className="mt-4 flex justify-center gap-2 text-sm text-nowrap">
        <span>Don't have an account?</span>
        <button 
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => handleAuthMode("register")}
        >
          Register
        </button> 
        {/* <span> or </span>  
        <button 
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => handleAuthMode("verify")}
        >
          Verify
        </button> */}
      </div>
    </CardContent>
  );
}
