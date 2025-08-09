"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { Plan } from '@/types';


interface PopUpProps {
  plan: Plan;
}

const defaultFeatures = [
  "Cobertura continua durante el período de suscripción",
  "Activación inmediata al suscribirse",
  "Cancelación en cualquier momento",
  "Recogido profesional",
  "Traslado seguro*",
  "Facilidades propias",
  "Gestión de permisos",
  "Cremación certificada",
  "Urna estándar**",
  "Certificados legales",
  "Entrega personalizada",
];

const PopUp: React.FC<PopUpProps> = ({ plan }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!Cookies.get('popupHidden') && !plan.isSubscription) {
      setIsVisible(true);
    }
  }, [plan.isSubscription]);

  const handleClose = () => {
    setIsVisible(false);
    Cookies.set('popupHidden', 'true', { expires: 0.5 });
  };

  const handleContact = () => {
    handleClose();
    window.location.href = `/subscription?priceId=${plan.link}`;
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
                <h2 className="text-3xl md:text-4xl font-bold mb-2">🎉 Oferta Especial</h2>
                <p className="text-lg md:text-xl opacity-90">¡Obtén acceso exclusivo ahora mismo!</p>
              </div>

              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
                <div className="relative text-3xl md:text-7xl leading-loose font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {plan.name}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl md:text-2xl mb-6 max-w-md mx-auto">
                  ¡No pierdas esta oportunidad única! Beneficios incluyen:
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-xl">
                  {defaultFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2 text-xs md:text-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleContact}
                className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto"
              >
                ¡Contrata Ahora!
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