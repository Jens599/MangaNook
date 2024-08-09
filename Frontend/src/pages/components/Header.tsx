import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/Art.svg";
import text from "@/assets/logo/Text.svg";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.state.token) setIsLoggedIn(true);
  }, [authContext?.state.token]);

  return (
    <header className="bg-slate-900 text-orange-300 shadow-md shadow-slate-950">
      <div className="flex items-center justify-between px-10 py-8">
        <NavLink to="/">
          <div id="logo" className="flex items-end gap-4">
            <img src={logo} className="w-10 object-cover" alt="Logo" />
            <img src={text} className="h-10" alt="Text Logo" />
          </div>
        </NavLink>
        <nav className="hidden md:block">
          <ul className="flex flex-col gap-4 md:flex-row">
            <li className="cursor-pointer font-bold hover:text-white">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="cursor-pointer font-bold hover:text-white">
              <NavLink to="/recommend">Recommend</NavLink>
            </li>

            {isLoggedIn && (
              <li className="cursor-pointer font-bold hover:text-white">
                <NavLink to="/profile">Profile</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div id="CTA" className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <Button variant="outline">
              <NavLink to="/signup">Log Out</NavLink>
            </Button>
          ) : (
            <>
              <Button variant="default">
                <NavLink to="/login">Log In</NavLink>
              </Button>
              <Button variant="outline">
                <NavLink to="/signup">Sign Up</NavLink>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col items-center gap-4 pb-4 md:hidden">
          <nav className="w-[calc(100%-6rem)]">
            <ul className="flex flex-col items-center gap-2">
              <li className="mx-6 w-full cursor-pointer rounded-xl py-2 text-center font-bold outline-1 hover:bg-slate-900 hover:text-white hover:outline">
                <NavLink to="/" onClick={toggleMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li className="mx-6 w-full cursor-pointer rounded-xl py-2 text-center font-bold outline-1 hover:bg-slate-900 hover:text-white hover:outline">
                <NavLink to="/recommend" onClick={toggleMobileMenu}>
                  Recommend
                </NavLink>
              </li>
              {isLoggedIn && (
                <li className="mx-6 w-full cursor-pointer rounded-xl py-2 text-center font-bold outline-1 hover:bg-slate-900 hover:text-white hover:outline">
                  <NavLink to="/profile" onClick={toggleMobileMenu}>
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className="w-[calc(100%-6rem)] outline outline-1" />
          <div id="CTA" className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button variant="outline">
                <NavLink to="/signup">Log Out</NavLink>
              </Button>
            ) : (
              <>
                <Button variant="default">
                  <NavLink to="/login">Log In</NavLink>
                </Button>
                <Button variant="outline">
                  <NavLink to="/signup">Sign Up</NavLink>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
