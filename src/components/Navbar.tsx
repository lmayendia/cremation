// components/Navbar.tsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from './LogoutButton';
import { NavbarProps, HandlePlanesClick } from "@/types";


const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const pathname: string | null = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos: number = window.pageYOffset;
      setIsScrollingUp(scrollPos > currentScrollPos && currentScrollPos > 0);
      setShowNavbar(
        currentScrollPos < 50 || (scrollPos > currentScrollPos && currentScrollPos > 0)
      );
      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos]);

  const textColor: string =
    pathname === "/"
      ? isScrollingUp
        ? "text-gray-800"
        : "text-white"
      : "text-black";

  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startY + distanceY * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handlePlanesClick: HandlePlanesClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      const pricingElement: HTMLElement | null = document.getElementById("pricing");
      if (pricingElement) {
        const targetY = pricingElement.getBoundingClientRect().top + window.pageYOffset;
        smoothScrollTo(targetY, 1000);
      }
    } else {
      router.push("/#pricing");
    }
  };

  return (
    <nav
      className={`${
        showNavbar ? "top-0" : "-top-20"
      } py-2 fixed w-full z-20 p-4 transition-all duration-300 ${
        isScrollingUp ? "bg-white opacity-70 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="hover:scale-105 transform transition delay-100">
          <Link href="/">
            <Image
              src="/images/logo-small.png"
              width={50}
              height={50}
              alt="Logo Cremacion Directa"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`hidden md:flex space-x-10 items-center text-xl ${textColor}`}>
          <a
            href="/#pricing"
            onClick={handlePlanesClick}
            className="link-button hover:font-bold py-2 cursor-pointer"
          >
            Planes
          </a>
          <Link className="link-button hover:font-bold py-2" href="/proveedores">
            Proveedores
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/urnas">
            Urnas
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/contact">
            Contacto
          </Link>

          {/* Profile Link and Logout Button */}
          <div className="flex space-x-6 items-center">
            {isLoggedIn && (
              <>
                {/* Profile Link with SVG */}
                <Link href="/profile" className="flex items-center">
                  <Image
                    src="/icons/profile.svg"
                    width={48}
                    height={48}
                    alt="Profile Icon"
                    className={`${textColor === "text-gray-800" ? "fill-gray-800" : "fill-white"}`} // Conditional fill
                  />
                </Link>
                <LogoutButton />
              </>
            )}
            {!isLoggedIn && (
              <Link href="/sign-in">
                <button className="bg-primary-500 border border-primary-500 text-white py-1 px-6 rounded hover:bg-primary-700 hover:border-primary-700 transition transform hover:scale-105 duration-300">
                  Iniciar Sesion
                </button>
              </Link>
            )}
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
