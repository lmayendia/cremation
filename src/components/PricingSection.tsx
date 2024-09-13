"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Define types
type PricingPlanThree = {
  name: string;
  price: string;
  period: string; // Added period property
  total: string;
  description: string;
};

type PricingPlanTwo = {
  name: string;
  price: string;
  discountPrice: string;
  savings: string; // Added savings property
  description: string;
};

const isPricingPlanThree = (
  plan: PricingPlanThree | PricingPlanTwo
): plan is PricingPlanThree => {
  return (plan as PricingPlanThree).period !== undefined;
};


const PricingSection = () => {
  const [viewMode, setViewMode] = useState<2 | 3>(3); // 3 for 3 cards, 2 for 2 cards
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<
    "fadeOut" | "fadeIn" | null
  >(null);

  const titleRef = useRef<HTMLDivElement>(null); // Reference for the title
  const descriptionRef = useRef<HTMLDivElement>(null); // Reference for description text
  const subTitleRef = useRef<HTMLDivElement>(null); // Reference for subtitle text

  const pricingPlansThree: PricingPlanThree[] = [
    {
      name: "24 Meses",
      price: "$58.12",
      period: "/mes",
      total: "$1,395",
      description: "El equilibrio perfecto entre pagos y plazo para tu comodidad.",
    },
    {
      name: "70 Meses",
      price: "$19.95",
      period: "/mes",
      total: "$1,396",
      description: "Pagos mensuales bajos que se adaptan a tu presupuesto.",
    },
    {
      name: "12 Meses",
      price: "$116.25",
      period: "/mes",
      total: "$1,395",
      description: "Completa tu plan rápidamente y disfruta de tranquilidad en menos tiempo.",
    },
  ];
  

  const pricingPlansTwo: PricingPlanTwo[] = [
    {
      name: "Uso Inmediato",
      price: "$995",
      discountPrice: "$1,396",
      savings: "$401",
      description:
        "Un solo pago. Para aquellos que necesitan usarlo inmediatamente",
    },
    {
      name: "Plan a futuro",
      price: "$995",
      discountPrice: "$1,396",
      savings: "$401",
      description:
        "Disfrútalo cuando más lo necesites. Transferible a quien desees",
    },
  ];

  const handleSwitchMode = () => {
    if (isTransitioning) return; // Prevent triggering during transition

    setIsTransitioning(true);
    setTransitionStage("fadeOut");

    // Duration should match the fade-out animation duration
    setTimeout(() => {
      setViewMode(viewMode === 3 ? 2 : 3); // Switch between 2 and 3 cards
      setTransitionStage("fadeIn");

      // Duration should match the fade-in animation duration
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStage(null);
      }, 300);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      const activateFadeIn = (element: HTMLDivElement | null) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.add("fade-in-active");
          }
        }
      };

      activateFadeIn(titleRef.current);
      activateFadeIn(descriptionRef.current);
      activateFadeIn(subTitleRef.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto md:text-center md:p-0 p-6">
        {/* Small Heading */}
        <div
          ref={subTitleRef}
          className="fade-in text-primary-500 md:text-xl mb-4 font-bold"
        >
          MÁS DE 20 AÑOS EN EL MERCADO
        </div>

        {/* Main Heading */}
        <div
          ref={titleRef}
          className="fade-in text-3xl md:text-6xl font-bold text-gray-800 mb-8 uppercase"
        >
          Planes diseñados para tu tranquilidad
        </div>

        {/* Small Text */}
        <div
          ref={descriptionRef}
          className="fade-in text-lg md:text-2xl text-gray-600 md:max-w-3xl mx-auto mb-8"
        >
          El presupuesto de cada familia es diferente. Es por eso que ofrecemos
          planes que se ajustan a todos los presupuestos. Tenemos planes con{" "}
          <strong className="uppercase text-black">zero pronto</strong> y todos
          nuestros planes, una vez pagos en su totalidad, son{" "}
          <strong className="text-black">
            100% transferibles a cualquier persona designada por el contratante.
          </strong>
        </div>

        {/* Toggle Button for 3 or 2 cards */}
        <div className="my-24 flex items-center justify-center">
          <div className="relative inline-block w-3/4 h-20 md:w-1/4 md:h-14">
            <button
              onClick={handleSwitchMode}
              className={`absolute md:text-lg inset-y-0 left-0 w-1/2 h-full z-10 font-bold transition-colors duration-300 ease-in-out ${
                viewMode === 3 ? "text-white" : "text-gray-600"
              }`}
            >
              Pagos Mensuales
            </button>
            <button
              onClick={handleSwitchMode}
              className={`absolute md:text-lg inset-y-0 right-0 w-1/2 h-full z-10 font-bold transition-colors duration-300 ease-in-out ${
                viewMode === 2 ? "text-white" : "text-gray-600"
              }`}
            >
              Un Solo Pago
            </button>
            <span
              className={`absolute top-0 h-full w-1/2 rounded-full bg-primary-500 transition-all duration-300 z-0 ${
                viewMode === 3 ? "left-0" : "left-1/2"
              }`}
            ></span>
            <div className="absolute inset-0 border-2 border-primary-500 rounded-full"></div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`relative cards-container ${
            transitionStage ? transitionStage : ""
          } ${
            viewMode === 3
              ? "grid grid-cols-1 md:grid-cols-3 gap-8"
              : "flex flex-wrap justify-center gap-8"
          }`}
        >
          {(viewMode === 3 ? pricingPlansThree : pricingPlansTwo).map(
            (plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 ${
                  viewMode === 3 ? "" : "w-full md:w-1/3"
                }`}
              >
                {/* Curved Heading */}
                <div
                  className="relative bg-secondary-gradient text-white p-8 pb-16 card-header"
                  style={{
                    borderRadius: "100% 0% 100% 0% / 0% 50% 50% 100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                  {/* Price Display for 3-Card View */}
                  {isPricingPlanThree(plan) ? (
                    // Render PricingPlanThree content
                    <p className="md:text-7xl text-5xl font-bold mb-2">
                      {plan.price}
                      <span className="md:text-4xl text-lg font-medium">{plan.period}</span>
                    </p>
                  ) : (
                    // Render PricingPlanTwo content
                    <div className="mb-2 flex flex-col items-center" >
                      <p className="text-2xl text-red-500 line-through">
                        {plan.discountPrice}
                      </p>
                      <p className="text-gray-800 text-lg font-bold">Ahorra {plan.savings}</p>
                    </div>
                  )}

                  {/* Price Display for 2-Card View */}
                  {viewMode === 2 && (
                    <p className="text-7xl font-bold mb-2">{plan.price}</p>
                  )}


                  {/* Total price only for 3-card view */}
                  {viewMode === 3 && "total" in plan && (
                    <p className="text-lg mb-2">
                      Total: {(plan as PricingPlanThree).total}
                    </p>
                  )}

                  <p className="md:text-xl text-lg text-gray-900 my-10">
                    {plan.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-8 pt-4">
                  <ul className="text-left my-4 space-y-2 md:text-lg">
                    {[
                      "Recogido",
                      "Traslado a Instituto de Ciencias Forenses",
                      "Traslado a nuestras facilidades",
                      "Tramitación de permisología",
                      "Proceso de cremación",
                      "Preparación de certificaciones",
                      "Urna temporera",
                      "Entrega de cenizas",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <Image
                          src="/icons/check.svg"
                          alt="Check"
                          width={24}
                          height={24}
                          className="h-5 w-5 text-primary-500 mr-2"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-primary-700 transition">
                    Contrata Ahora
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .fade-in-active {
          opacity: 1;
        }

        .cards-container {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .cards-container.fadeOut {
          opacity: 0;
          transform: scale(0.95);
        }

        .cards-container.fadeIn {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
