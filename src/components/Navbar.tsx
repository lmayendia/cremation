"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingUp(scrollPos > currentScrollPos && currentScrollPos > 0);
      setShowNavbar(currentScrollPos < 50 || isScrollingUp);
      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos, isScrollingUp]);

  return (
    <nav
      className={`${
        showNavbar ? "top-0" : "-top-20"
      } py-8 fixed w-full z-20 p-4 transition-all duration-300 ${
        isScrollingUp
          ? "bg-white opacity-70 text-gray-800 shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">CremacionDirecta</Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex space-x-10 items-center text-xl ${
            isScrollingUp ? "text-gray-800" : "text-white"
          }`}
        >
          <Link className="link-button hover:font-bold py-2" href="/planes">
            Planes
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/services">
            Servicios
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/urnas">
            Urnas
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/contact">
            Contacto
          </Link>

          {/* Sign In and Sign Up buttons */}
          <div className="flex space-x-6 items-center">
            <Link href="/signin">
              <button className="bg-primary-500 border border-primary-500 text-white py-1 px-6 rounded hover:bg-primary-700 hover:border-primary-700 transition transform hover:scale-105 duration-300">
                Iniciar Sesion
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
