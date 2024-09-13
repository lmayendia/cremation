"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen flex overflow-hidden">
      {/* Left half with parallax effect */}
      <div className="w-1/2 h-full bg-primary-gradient flex flex-col items-start justify-center text-white p-8 md:p-32">
        <h1 className="text-4xl md:text-7xl font-bold  md:leading-tigh uppercase">
          Planifica con salud y vida, el camino a la vida eterna
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl py-5">
          Protege tu futuro o el de tus seres queridos con nuestros planes accesibles. <br /> <br />
          Desde solo <span className="font-extrabold">$19.95</span> al mes, puedes asegurar un servicio de cremación completo y transferible, disponible cuando más se necesite.
        </p>
        <div className="mt-20 flex space-x-4">
          <button className="btn-1 relative font-bold text-white text-xl py-4 px-6 rounded overflow-hidden group hover:bg-transparent transition-all duration-300 ease-in-out">
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
              DESCUBRE MÁS
            </span>
            {/* SVG Rectangle for Border Animation */}
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" viewBox="0 0 110 45" preserveAspectRatio="none">
              <rect x="1" y="1" width="106" height="41" />
            </svg>
          </button>


          <div className="relative">
            <button className="relative transform hover:scale-105 duration-300 font-bold bg-secondary-600 text-white text-xl py-4 px-6 rounded hover:bg-secondary-700 transition z-20">
              SUBSCRIBETE AHORA
            </button>
            {/* Ripple Effect Behind the Button */}
            <div className="absolute inset-0 z-10 ripple-container"></div>
          </div>
        </div>
      </div>


      {/* Right half with solid background */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <div
          className="absolute inset-0 -z-20 transform transition-transform duration-[800ms] ease-out"
          style={{
            transform: `translateY(${scrollY * 0.1}px)` // Slow parallax for background
          }}
        >
          <Image
            src="/images/background-hero.jpg"
            alt="Background Image"
            priority
            className="absolute inset-0 w-full h-full object-cover"
            fill
            quality={75}
          />
          <div className="absolute inset-0 bg-black opacity-25"></div> {/* Dark overlay */}
        </div>

        {/* Foreground People Layer (moves faster) */}
        <div
          className="absolute inset-0 -z-10 transform transition-transform duration-[800ms] ease-out"
          style={{
            transform: `translateY(${scrollY * 0.2}px)` // Faster parallax for the people
          }}
        >
          <Image
            src="/images/hero-people.png"
            alt="Foreground People"
            className="absolute inset-0 w-full h-full object-cover"
            priority
            fill
            quality={75}
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;
