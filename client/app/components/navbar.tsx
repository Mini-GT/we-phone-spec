import { Link, NavLink } from "react-router"
// import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import LoginForm from "./loginForm"
import { Button } from "./ui/button"
import { useLogin } from "~/context/loginContext"

const formSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Must be 6 or more characters long" })
    .max(254 , { message: "Must be 254  or fewer characters long" })
})

export default function Navbar() {
   const { setIsLoginClicked } = useLogin()

   function handleLoginClick() {
    setIsLoginClicked(prevState => ((!prevState)))
  }

  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-10xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-xl font-black text-gray-900 select-none">
              We<span className="text-indigo-600">PhoneSpec</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            
          <div className="mr-5 font-medium text-gray-600 hover:text-gray-900">
            <div className="flex items-center border border-gray-400 rounded-lg focus-within:border-gray-900">
              <input
                type="text"
                className="border-none outline-none px-3 py-2 flex-1 rounded-l-lg"
                placeholder="Search smartphone..."
              />
              <button type="submit" className="p-2">
                <img src="search.svg" alt="search" className="w-5 h-5" />
              </button>
            </div>
          </div>

            <NavLink
              to="/"
              end
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/smartphones"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Smartphones
            </NavLink>
            <NavLink
              to="/mostpopular"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              Most Popular
            </NavLink>
            <NavLink
              to="/about"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </NavLink>
          </nav>
        </div>
        <Button 
          className="cursor-pointer"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </header>
  )
}