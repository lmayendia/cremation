"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PlanningSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative md:h-[50vh] md:py-16 pt-16 pb-28 flex items-center justify-center transition-opacity duration-1000 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto md:text-center px-8">
        <div className="flex items-center justify-center">
          {/* Left (Opening) Quote Image */}
          <div className="relative w-24 h-24 md:w-16 md:mb-12 md:h-16 mr-2">
            <Image
              src="/images/quotes.png"
              alt="Opening Quote"
              fill
              className="w-2 h-2"
              objectFit="contain"
            />
          </div>

          {/* Heading Text */}
          <h2 className="text-3xl text-center mt-12 md:mt-0 md:text-7xl font-bold text-gray-800">
            Planificar es un gesto de amor
          </h2>

          {/* Right (Closing) Quote Image with 180 Degree Rotation */}
          <div className="relative w-24 h-24 md:w-16 md:mb-12 md:h-16 ml-2 rotate-180">
            <Image
              src="/images/quotes.png"
              alt="Closing Quote"
              fill
              objectFit="contain"
            />
          </div>
        </div>

        <p className="mt-6 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Descubre una nueva manera de planificar la vida eterna. Planes con{" "}
          <span className="font-bold text-black">ZERO PRONTO</span> y cómodos{" "}
          <span className="font-bold uppercase text-black">pagos mensuales</span> que se ajustan
          a tu presupuesto. <span className="uppercase font-bold text-black">Sin intereses</span>.
        </p>
      </div>

      {/* Shield Image with Grow Effect */}
      <div className="absolute md:block hidden bottom-10 right-96 w-24 h-24 md:w-32 md:h-32 transition-transform transform hover:scale-110 duration-300">
        <Image
          src="/images/shield.png" // Path to the shield image
          alt="Shield"
          fill
          className="object-contain"
/>
      </div>

      {/* Absolute Positioned Arrows */}
      <div
        className={`absolute md:block hidden left-0 top-1/2 transform transition-transform duration-700 ease-in-out ${
          isVisible
            ? "-translate-y-3/4 -translate-x-3"
            : "-translate-y-1/2 -translate-x-full"
        }`}
      >
        <Image
          src="/images/left-arrow.svg"
          alt="Left Arrow"
          width={350}
          height={350}
        />
      </div>

      <div
        className={`absolute md:block hidden right-0 top-1/2 transform transition-transform duration-1000 ease-in-out ${
          isVisible
            ? "translate-y-5 translate-x-3"
            : "-translate-y-1/2 translate-x-full"
        }`}
      >
        <Image
          src="/images/right-arrow.svg"
          alt="Right Arrow"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
};

export default PlanningSection;
