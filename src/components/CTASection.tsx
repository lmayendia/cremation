"use client"
import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-primary-800 px-72 py-32 flex justify-center items-center flex-col text-white">
      
      <h2 className="text-4xl md:text-7xl font-bold md:mb-12 pe-36 leading-loose">
        Elimínale a tus seres queridos la angustia, incertidumbre y necesidad.
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Subheading */}
        <p className="text-lg md:text-3xl text-start pe-44">
          Muchas veces nos toma por sorpresa y no sabemos ni por dónde empezar a coordinar y/o no estamos preparados económicamente. ¡Prepárate ahora!
        </p>

        {/* CTA Button with Ripple Effect */}
        <div className="relative">
          <button className="relative text-xl uppercase z-10 bg-primary-100 text-primary-800 font-bold py-6 px-12 rounded-lg transition-transform duration-300 transform hover:scale-105 overflow-hidden">
            Suscribete
          </button>
          {/* Ripple Effect */}
          <div className="absolute inset-0 pointer-events-none ripple-container "></div>
        </div>
      </div>

      {/* Ripple and Keyframe Animations */}
      <style jsx>{`
        .ripple-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          pointer-events: none;
        }

        .ripple-container::before,
        .ripple-container::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5); /* Thin circle outline */
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }

        .relative:hover .ripple-container::before,
        .relative:hover .ripple-container::after {
          animation: ripple 1.5s infinite;
        }

        .ripple-container::after {
          width: 120px;
          height: 120px;
          animation-delay: 0.3s; /* Delayed for concentric circles */
        }

        .ripple-container::before {
          width: 150px;
          height: 150px;
        }

        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
