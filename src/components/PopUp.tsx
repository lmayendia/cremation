"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

const PopUp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const popupCookie = Cookies.get('popupHidden');
    if (!popupCookie) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const targetDate = new Date('December 31, 2024 23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timerId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initialize immediately
    return () => clearInterval(timerId);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    Cookies.set('popupHidden', 'true', { expires: 0.5 });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mx-5 md:mx-0 relative flex items-center justify-center w-full max-w-2xl bg-blue-800 text-white p-8 text-center rounded-lg shadow-lg z-50">
        <button
          className="absolute top-2 right-2 text-blue-800 rounded-full px-2 py-1 font-bold"
          onClick={handleClose}
        >
          <Image src="/icons/close.svg" alt="close" width={24} height={24} />
        </button>
        <div className="w-full">
          <h1 className="lg:text-6xl text-4xl font-bold mb-2">OFERTA DE INTRODUCCION</h1>
          <div className="flex justify-center items-center">
            <h2 className="lg:text-8xl text-7xl font-bold my-4">10%</h2>
            <p className="ms-4 max-w-52 text-center">DE DESCUENTO EN TODOS NUESTROS PLANES</p>
          </div>
          <a
            href="#pricing"
            className="inline-block mt-4 px-6 py-2 bg-white text-blue-800 font-bold rounded-md"
            onClick={handleClose}
          >
            SUSCRIBETE
          </a>
          <p className="mt-8">LA OFERTA TERMINA EN:</p>
          <div className="grid grid-cols-4 gap-4 mt-4 bg-white p-4 rounded-md text">
            {["days", "hours", "minutes", "seconds"].map((unit, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white flex flex-col items-center justify-center px-2 py-4 rounded-md"
              >
                <span className="block text-xl md:text-5xl font-bold">{timeLeft[unit as keyof typeof timeLeft]}</span>
                <span className="uppercase text-xs">{unit.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
