"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';


const PopUp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!Cookies.get('popupHidden')) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const targetDate = new Date('February 20, 2025 23:59:59').getTime();
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
    updateCountdown(); // Initial call
    return () => clearInterval(timerId);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    Cookies.set('popupHidden', 'true', { expires: 0.5 });
  };

  if (!isVisible) return null;

  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12 text-center">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">🎉 Oferta de Lanzamiento</h2>
                <p className="text-lg md:text-xl opacity-90">¡Obtén un descuento exclusivo!</p>
              </div>

              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
                <div className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  10% OFF
                </div>
              </div>

              <div className="mb-8">
                <p className="uppercase text-sm tracking-wider opacity-80 mb-4">La oferta termina en:</p>
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-2xl md:text-4xl font-bold mb-1">{value}</div>
                      <div className="text-xs uppercase tracking-wider opacity-80">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg"
              >
                ¡Quiero el Descuento!
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopUp;