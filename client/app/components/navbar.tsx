import { NavLink } from "react-router"
import { Button } from "./ui/button"
import { useLogin } from "~/context/loginContext"
// import authService from "~/services/auth.service"
import { use, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import UserMenu from "./userMenu"
import { useAuth } from "~/context/authContext"

export default function Navbar() {
  const { setIsLoginClicked } = useLogin()
  const { user } = useAuth()
  // const {data, isLoading} = useQuery({
  //   queryFn: () => authService.getMe(),
  //   queryKey: ["me"],
  //   retry: false
  // })
  // const user = data?.data
  async function handleLoginClick() {
    setIsLoginClicked(prevState => ((!prevState)))
  }

  return (
    <header className="w-full text-gray-700 bg-white shadow-sm">
      <div className="mx-15 flex flex-col justify-between md:flex-row items-center py-5">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-4xl font-black text-gray-900 select-none">
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
                  <img src="/search.svg" alt="search" className="w-5 h-5" />
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

        {user ? 
        <UserMenu 
          name={user.name}
          email={user.email}
          profileImage={user.profileImage}
        /> :
        <Button 
        className="cursor-pointer"
        onClick={handleLoginClick}
      >
        Login
      </Button>}
        
      </div>
    </header>
  )
}