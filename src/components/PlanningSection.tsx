"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlanningSectionProps } from "@/types";

const PlanningSection: React.FC<PlanningSectionProps> = ({
  mainHeading,
  description,
  highlightedText1,
  highlightedText2,
  highlightedText3,
  quotesImageSrc = "/images/quotes.png",
  quotesImageAlt = "Quote marks",
  shieldImageSrc = "/images/shield.png",
  shieldImageAlt = "Shield",
  leftArrowImageSrc = "/images/left-arrow.svg",
  leftArrowImageAlt = "Left Arrow",
  rightArrowImageSrc = "/images/right-arrow.svg",
  rightArrowImageAlt = "Right Arrow"
}) => {
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
              src={quotesImageSrc}
              alt={quotesImageAlt}
              fill
              className="w-2 h-2 object-contain"
              />
          </div>

          {/* Heading Text */}
          <h2 className="text-3xl text-center mt-12 md:mt-0 md:text-7xl font-bold text-gray-800">
            {mainHeading}
          </h2>

          {/* Right (Closing) Quote Image with 180 Degree Rotation */}
          <div className="relative w-24 h-24 md:w-16 md:mb-12 md:h-16 ml-2 rotate-180">
            <Image
              src={quotesImageSrc}
              alt={quotesImageAlt}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="mt-6 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
          {(() => {
            let result = description;
            result = result.replace('{{highlight1}}', `<span class="font-bold text-black">${highlightedText1}</span>`);
            result = result.replace('{{highlight2}}', `<span class="font-bold uppercase text-black">${highlightedText2}</span>`);
            result = result.replace('{{highlight3}}', `<span class="uppercase font-bold text-black">${highlightedText3}</span>`);
            
            return <span dangerouslySetInnerHTML={{ __html: result }} />;
          })()}
        </p>
      </div>

      {/* Shield Image with Grow Effect */}
      <div className="absolute lg:block hidden bottom-10 right-24 w-24 h-24 md:w-32 md:h-32 transition-transform transform hover:scale-110 duration-300">
        <Image
          src={shieldImageSrc}
          alt={shieldImageAlt}
          fill
          className="object-contain"
/>
      </div>

      {/* Absolute Positioned Arrows */}
      <div
        className={`absolute lg:block hidden left-0 top-1/2 transform transition-transform duration-700 ease-in-out ${
          isVisible
            ? "-translate-y-3/4 -translate-x-3"
            : "-translate-y-1/2 -translate-x-full"
        }`}
      >
        <Image
          src={leftArrowImageSrc}
          alt={leftArrowImageAlt}
          width={250}
          height={250}
        />
      </div>

      <div
        className={`absolute lg:block hidden right-0 top-1/2 transform transition-transform duration-1000 ease-in-out ${
          isVisible
            ? "translate-y-5 translate-x-3"
            : "-translate-y-1/2 translate-x-full"
        }`}
      >
        <Image
          src={rightArrowImageSrc}
          alt={rightArrowImageAlt}
          width={250}
          height={250}
          
        />
      </div>
    </section>
  );
};

export default PlanningSection;
