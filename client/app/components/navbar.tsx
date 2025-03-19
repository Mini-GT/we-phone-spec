import { Link, NavLink } from "react-router"
import { Button } from "./ui/button"

export default function Navbar() {
  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-xl font-black text-gray-900 select-none">
              We<span className="text-indigo-600">PhoneSpec</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
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
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </header>
  )
}