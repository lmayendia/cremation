"use client"
import React, { useState } from "react";
import Image from "next/image";

interface FAQItem {
  title: string;
  answer: string;
}

interface FAQComponentProps {
  FAQ: FAQItem[];
}

export const FAQComponent: React.FC<FAQComponentProps> = ({ FAQ }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-primary-500" id="faq">
      <div className="text-center md:my-24 md:p-0 my-12 p-6">
        <h4 className="text-primary-100 md:text-2xl mb-2">¿Tienes preguntas?</h4>
        <h2 className="text-white md:text-6xl text-5xl uppercase font-bold">
          Preguntas frecuentes
        </h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 items-start">
        {FAQ.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-lg bg-white p-6 transition-all duration-500 cursor-pointer ${
              activeIndex === index ? "shadow-lg" : "shadow"
            }`}
            onClick={() => toggleFAQ(index)}
          >
            {/* Wrap the question and arrow in a flex container */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-700">{item.title}</h3>
              <div
                className={`transform transition-transform duration-500 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                <Image src="/icons/arrow.svg" alt="Arrow Icon" width={24} height={24} />
              </div>
            </div>

            {/* Conditionally render the answer only when the question is clicked */}
            <div
              className={`transition-all duration-100 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-screen mt-4" : "max-h-0"
              }`}
            >
              <p
                className={`text-gray-700 transition-opacity duration-300 text-lg ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};