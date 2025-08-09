"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

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

  const handlePlanesClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      const pricingElement = document.getElementById("pricing");
      if (pricingElement) {
        const targetY = pricingElement.offsetTop;
        smoothScrollTo(targetY, 1000);
      }
    } else {
      router.push("/#pricing");
    }
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      const faqElement = document.getElementById("faq");
      if (faqElement) {
        const targetY = faqElement.offsetTop;
        smoothScrollTo(targetY, 1000);
      }
    } else {
      router.push("/#faq");
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      const targetHash = window.location.hash;

      if (targetHash === "#pricing") {
        const pricingElement = document.getElementById("pricing");
        if (pricingElement) {
          const targetY = pricingElement.offsetTop;
          smoothScrollTo(targetY, 1000);
        }
      } else if (targetHash === "#faq") {
        const faqElement = document.getElementById("faq");
        if (faqElement) {
          const targetY = faqElement.offsetTop;
          smoothScrollTo(targetY, 1000);
        }
      }
    }
  }, [pathname]);

  return (
    <footer className="bg-primary-500 text-gray-100 w-full max-w-full overflow-x-clip py-8 md:py-12">
      <div className="container mx-auto w-full px-4 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Left Side: Logo and Rights */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="text-xl md:text-2xl font-bold">
            <Link href="/">
              <Image
                src="/images/logo-white.png"
                width={200}
                height={200}
                alt="Logo Cremacion Directa"
                className="w-36 h-auto md:w-[200px] md:h-[200px]"
              />
            </Link>
          </div>
          <p className="text-xs md:text-sm mt-8 md:mt-12 border-t-2 pt-4 md:pt-6">
            &copy; {new Date().getFullYear()} CremacionDirecta. All rights reserved.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-col items-center space-y-3 md:space-y-0 md:space-x-10 text-base md:text-xl">
          <div className="flex items-center md:items-start border-b-2 pb-2 flex-wrap gap-x-4 gap-y-2">
            <a
              href="/#pricing"
              onClick={handlePlanesClick}
              className="hover:font-bold py-1 md:py-2 cursor-pointer"
            >
              Planes
            </a>
            <a
              href="/#faq"
              onClick={handleFAQClick}
              className="hover:font-bold py-1 md:py-2 cursor-pointer"
            >
              Preguntas frecuentes
            </a>
            <Link className="hover:font-bold py-1 md:py-2" href="/urnas">
              Urnas
            </Link>
            <Link className="hover:font-bold py-1 md:py-2" href="/contact">
              Contacto
            </Link>
            <Link className="hover:font-bold py-1 md:py-2" href="/terms">
              Términos y Condiciones
            </Link>
          </div>
          <div className="flex justify-end w-full">
          <Link className="hover:font-bold py-2 md:py-3" href="/proveedores" >
            Conviertete en aliado
          </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;