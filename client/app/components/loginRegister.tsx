import { useState } from "react";
import { Card } from "./ui/card";
import { X } from "lucide-react";
import { usePopupButton } from "~/context/popupButtonContext";
import RegisterForm from "./registerForm";
import VerifyForm from "./verifyForm";
import LoginForm from "./form/loginForm";

export default function LoginRegister() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { popupButton, setPopupButton } = usePopupButton();
  const [authMode, setAuthMode] = useState<"login" | "register" | "verify">("login");

  /* function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Logging in with:", loginFormData.email, loginFormData.password );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  }; */

  function closeModalCard() {
    setPopupButton(prevState => ({
      ...prevState,
      isLoginClicked: false,
    }))
  }

  return (
    <div className={`flex z-1 fixed inset-0 absolute items-center justify-center backdrop-blur-xs bg-black/50`}>
      <Card className={`relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg ${popupButton.isLoginClicked ? "animate-popup-enter" : ""}`}>
        <button 
          onClick={closeModalCard} 
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
