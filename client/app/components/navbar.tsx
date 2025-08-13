import { NavLink, useMatches } from "react-router"
import { Button } from "./ui/button"
import { usePopupButton } from "~/context/popupButtonContext"
import UserMenu from "./userMenu"
import type { UserType } from "~/types/globals.type"
import SearchBar from "./searchBar"
import ProgressBar from "./progressBar"

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
          <nav className="flex flex-wrap gap-5 items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <SearchBar />
            {/* <div className="mr-5 font-medium text-gray-600 hover:text-gray-900">
              
            </div> */}

            <NavLink
              to="/"
              end
              className="font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/smartphones"
              className="font-medium text-gray-600 hover:text-gray-900"
            >
              {({ isPending }) => (
                <>
                  <ProgressBar isPending={isPending} />
                  <span>Smartphones</span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/mostpopular"
              className="font-medium text-gray-600 hover:text-gray-900"
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