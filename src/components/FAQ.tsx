"use client";
import Image from 'next/image';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿El servicio se puede utilizar desde el primer pago?",
    answer: "Sí, el servicio se puede utilizar desde el primer pago. Es importante que el balance esté saldado al momento de utilizar el servicio.",
  },
  {
    question: "¿Se puede transferir el servicio?",
    answer: "Sí, el servicio es completamente transferible una vez esté saldado. Puedes designar a cualquier persona para utilizarlo en tu lugar.",
  },
  {
    question: "¿Cómo funciona el sistema de mensualidades?",
    answer: "De acuerdo a tu presupuesto, puedes escoger el plan de mensualidades que mejor se ajuste a tus necesidades. El servicio se paga en mensualidades hasta completarlo. Si surge una emergencia, puedes utilizar el plan antes de terminarlo, y solo necesitas saldar el balance restante.",
  },
  {
    question: "¿Cobran intereses por el financiamiento a plazos?",
    answer: "No, no cobramos intereses. Ofrecemos un financiamiento al 0% de interés para hacer el servicio accesible para todos.",
  },
  {
    question: "¿Se garantiza el precio al pagar en mensualidades?",
    answer: "Sí, al adquirir el servicio, el precio queda congelado. Esto significa que no se verá afectado por aumentos en el futuro, lo que es una de las grandes ventajas de contratar el plan ahora.",
  },
];

const FAQComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-primary-800">
      <div className="text-center my-24">
        <h4 className="text-primary-100 text-2xl mb-2">¿Tienes preguntas?</h4>
        <h2 className="text-white text-6xl uppercase font-bold">Preguntas frecuentes</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 items-start">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-lg bg-white p-6 transition-all duration-500 cursor-pointer ${
              activeIndex === index ? 'shadow-lg' : 'shadow'
            }`}
            onClick={() => toggleFAQ(index)}
          >
            {/* Wrap the question and arrow in a flex container */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-700">{item.question}</h3>
              <div
                className={`transform transition-transform duration-500 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              >
                <Image src="/icons/arrow.svg" alt="Arrow Icon" width={24} height={24} />
              </div>
            </div>

            {/* Conditionally render the answer only when the question is clicked */}
            <div
              className={`transition-all duration-100 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-screen mt-4' : 'max-h-0'
              }`}
            >
              <p
                className={`text-gray-700 transition-opacity duration-300 text-lg ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
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

export default FAQComponent;
