"use client";
import React from "react";
import { CTASectionProps } from "@/types";

const CTASection: React.FC<CTASectionProps> = ({
  mainHeading,
  description,
  highlightedText,
  buttonText,
  buttonLink = "#pricing"
}) => {
  return (
    <section className="bg-primary-500 px-8 md:px-28 py-16 md:py-32 flex justify-center items-center flex-col text-white">
      <h2 className="text-3xl md:text-7xl font-bold md:mb-12 pe-0 md:pe-36 leading-snug md:text-start">
        {mainHeading}
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 mt-6 md:mt-0">
        {/* Subheading */}
        <p className="text-base md:text-3xl text-start pe-0 md:pe-44 md:text-start mb-12">
          {(() => {
            const result = description.replace('{{highlight}}', `<strong>${highlightedText}</strong>`);
            return <span dangerouslySetInnerHTML={{ __html: result }} />;
          })()}
        </p>

        {/* CTA Button with Ripple Effect */}
        <div className="relative mt-6 md:mt-0">
          <a href={buttonLink}>
            <button className="relative text-lg md:text-xl uppercase z-10 bg-primary-100 text-primary-800 font-bold py-4 md:py-6 px-8 md:px-12 rounded-lg transition-transform duration-300 transform hover:scale-105 overflow-hidden">
              {buttonText}
            </button>
          </a>
          {/* Ripple Effect */}
          <div className="absolute inset-0 pointer-events-none ripple-container"></div>
        </div>
      </div>

    </section>
  );
};

export default CTASection;
