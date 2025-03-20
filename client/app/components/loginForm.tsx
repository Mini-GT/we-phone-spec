import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useLogin } from "~/context/loginContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoginClicked ,setIsLoginClicked } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  function handleLoginClick() {
    setIsLoginClicked(prevState => ((!prevState)))
  }

  return (
    <div className={`flex absolute items-center justify-center min-h-screen min-w-screen backdrop-blur-xs bg-black/50`}>
      <Card className={`relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg ${isLoginClicked && "animate-popup-enter"}`}>
        <button 
          onClick={handleLoginClick} 
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="mb-4 flex justify-between">
              <span>Don't have an account?</span>

              <a href="" className="hover:underline">
                <span>Register</span>
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
