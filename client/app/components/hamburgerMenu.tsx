import { useState } from 'react';
import { X, Menu, Home, User, Settings, Smartphone, Info } from 'lucide-react';
import type { UserType } from '~/types/globals.type';
import { NavLink } from 'react-router';

type HamburgerMenuProps = {
  name: UserType["name"] | undefined
  email: UserType["email"] | undefined
}

export default function HamburgerMenu({
  name,
  email
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: Smartphone, label: "Smartphones", link: "/smartphones" },
    { icon: User, label: "Profile", link: "/user/profile" },
    { icon: Settings, label: "Settings", link: "/user/settings" },
    { icon: Info, label: 'About', link: "/about" },
  ]

  return (
    <div className="relative">
      {/* Header */}
      <header className="z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Sliding Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    onClick={toggleMenu}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    <span className="text-gray-800 group-hover:text-blue-600 transition-colors duration-200 font-medium">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Menu Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}