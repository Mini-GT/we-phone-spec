import { NavLink, useMatches } from "react-router"
import { Button } from "./ui/button"
import { usePopupButton } from "~/context/popupButtonContext"
import UserMenu from "./userMenu"
import SearchBar from "./searchBar"
import { useUser } from "~/context/userContext"
import HamburgerMenu from "./hamburgerMenu"
import ProgressBar from "./progressBar"
import type { MatchesNotificationType } from "./ui/notificationBell"

export default function Navbar() {
  const { user: userMatchesData } = useMatches()[0].loaderData as MatchesNotificationType
  const { user: userContext } = useUser()
  const user = userMatchesData ?? userContext

  const { setPopupButton } = usePopupButton()
  async function handleLoginClick() {
    setPopupButton(prevState => ({
      ...prevState,
      isLoginClicked: !prevState.isLoginClicked,
    }))
  }
  
  return (
    <>
      <header className="w-full text-gray-700 bg-white border-b-1">
        <div className="w-full h-15 flex md:flex-row sm:py-2 items-center gap-6">
          <HamburgerMenu name={user?.name} email={user?.email} />
          {/* <NavLink to="/" className="flex items-center"> */}
          <NavLink to="/" className="flex flex-wrap flex-shrink-1 sm:flex-shrink-0 gap-2 text-xl sm:text-2xl items-center justify-center font-black text-gray-900 select-none">
            <span>We</span>
            <span className="text-indigo-600">PhoneSpec</span>
          </NavLink>
          {/* </NavLink> */}
          <nav className="sm:flex hidden sm:w-full sm:block gap-6 items-center ml-0 ">
            <div className="flex relative items-center justify-center hidden sm:block">
              <SearchBar />
            </div>
            {/* <div className="mr-5 font-medium text-gray-600 hover:text-gray-900">
              
            </div> */}
            <div className="flex space-x-4 hidden xl:block">
              <NavLink
                to="/"
                end
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                {({ isPending }) => (
                  <>
                    <ProgressBar isPending={isPending} />
                    <span>Home</span>
                  </>
                )}
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
              {/* <NavLink
                to="/mostpopular"
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                Most Popular
              </NavLink> */}
              <NavLink
                to="/about"
                className="font-medium text-gray-600 hover:text-gray-900"
              >
                About
              </NavLink>
            </div>
          </nav>
          <div className="flex w-auto ml-auto">
            {(user && (user.id !== "")) ? 
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
        </div>
      </header>
      <div className="sm:hidden">
        <SearchBar />
      </div>
    </>
  )
}