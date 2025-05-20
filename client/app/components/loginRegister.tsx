import { useState } from "react";
import { Card } from "./ui/card";
import { X } from "lucide-react";
import { useLogin } from "~/context/loginContext";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import VerifyForm from "./verifyForm";

export default function LoginRegister() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { isLoginClicked ,setIsLoginClicked } = useLogin();
  const [authMode, setAuthMode] = useState<"login" | "register" | "verify">("login");

  /* function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Logging in with:", loginFormData.email, loginFormData.password );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  }; */

  function handleLoginClick() {
    setIsLoginClicked(prevState => ((!prevState)))
  }

  return (
    <div className={`flex z-1 absolute items-center justify-center min-h-screen min-w-screen backdrop-blur-xs bg-black/50`}>
      <Card className={`relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg ${isLoginClicked ? "animate-popup-enter" : ""}`}>
        <button 
          onClick={handleLoginClick} 
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
        
        {authMode === "login" ? <LoginForm handleAuthMode={setAuthMode} /> : null}
        {authMode === "register" ? <RegisterForm handleAuthMode={setAuthMode} /> : null}
        {authMode === "verify" ? <VerifyForm handleAuthMode={setAuthMode} /> : null}
      </Card>
    </div>
  );
}
