import { NavLink, useMatches } from "react-router"
import { Button } from "./ui/button"
import { usePopupButton } from "~/context/popupButtonContext"
import UserMenu from "./userMenu"
import { useAuth } from "~/context/authContext"
import type { UserType } from "~/types/globals.type"
import NotificationBell from "./ui/notificationBell"

export default function Navbar() {
  const { setPopupButton } = usePopupButton()
  const matches = useMatches()
  const user = matches[0].data as UserType
  async function handleLoginClick() {
    setPopupButton(prevState => ({
      ...prevState,
      isLoginClicked: !prevState.isLoginClicked,
    }))
  }

  return (
    <header className="w-full text-gray-700 bg-white border-b-1">
      <div className="lg:mx-15 md:mx-10 sm:mx-5 flex flex-col justify-between md:flex-row items-center gap-2 py-5">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-4xl font-black text-gray-900 select-none">
              We<span className="text-indigo-600">PhoneSpec</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            
            {/* <div className="mr-5 font-medium text-gray-600 hover:text-gray-900">
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
            </div> */}

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
              className="font-medium text-gray-600 hover:text-gray-900"
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
          role={user.role}
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