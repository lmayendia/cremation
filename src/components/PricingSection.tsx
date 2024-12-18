// src/components/PricingSection.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PricingPlanTwo, PricingPlanThree, Plan } from "@/types";

interface PricingSectionProps {
  plans: Plan[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ plans }) => {
  const [viewMode, setViewMode] = useState<2 | 3>(3); // 3 for 3 cards, 2 for 2 cards
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<"fadeOut" | "fadeIn" | null>(null);

  const [pricingPlansThree, setPricingPlansThree] = useState<PricingPlanThree[]>([]);
  const [pricingPlansTwo, setPricingPlansTwo] = useState<PricingPlanTwo[]>([]);

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pricingPlansThree: PricingPlanThree[] = [];
    const pricingPlansTwo: PricingPlanTwo[] = [];

    plans.forEach((plan: Plan) => {
      if (plan.total !== null && plan.total !== undefined) {
        pricingPlansThree.push({
          name: plan.name,
          price: plan.price,
          period: plan.period || 0,
          total: plan.total || 995,
          description: plan.description,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription?priceId=${plan.link}`,
          currency: plan.currency,
        });
      } else {
        pricingPlansTwo.push({
          name: plan.name,
          price: plan.price,
          discountPrice: plan.discountPrice || 0,
          savings: plan.savings || 0,
          description: plan.description,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription?priceId=${plan.link}`,
          currency: plan.currency,
        });
      }
    });

    // Sort the arrays from highest to lowest based on price
    pricingPlansThree.sort((a, b) => b.price - a.price);
    pricingPlansTwo.sort((a, b) => b.price - a.price);

    setPricingPlansThree(pricingPlansThree);
    setPricingPlansTwo(pricingPlansTwo);
  }, [plans]);

  const handleSwitchMode = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionStage("fadeOut");

    setTimeout(() => {
      setViewMode(viewMode === 3 ? 2 : 3);
      setTransitionStage("fadeIn");

      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStage(null);
      }, 300);
    }, 300);
  };

  // Scroll Fade-In Effect
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
    handleScroll(); // Trigger scroll handler on mount to catch elements already in view
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which pricing plans to display based on viewMode
  const currentPricingPlans: PricingPlanThree[] | PricingPlanTwo[] =
    viewMode === 3 ? pricingPlansThree : pricingPlansTwo;

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto md:text-center md:p-0 px-6">
        <div
          ref={subTitleRef}
          className="fade-in text-primary-500 md:text-xl mb-4 font-bold"
        >
          MÁS DE 20 AÑOS EN EL MERCADO
        </div>

        <div
          ref={titleRef}
          className="fade-in text-3xl md:text-6xl font-bold text-gray-800 mb-8 uppercase"
        >
          Planes diseñados para tu tranquilidad
        </div>

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

        <div className="my-24 flex items-center justify-center">
          <div className="relative inline-block w-3/4 h-20 lg:w-1/4 md:h-14">
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

        <div
          className={`relative cards-container ${
            transitionStage ? transitionStage : ""
          } ${
            viewMode === 3
              ? "grid grid-cols-1 lg:grid-cols-3 gap-8"
              : "flex flex-wrap justify-center gap-8"
          }`}
        >
          {currentPricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 ${
                viewMode === 3 ? "" : "w-full lg:w-1/3"
              }`}
            >
              <div
                className="relative bg-primary-500 text-white p-8 pb-16 card-header"
                style={{
                  borderRadius: "100% 0% 100% 0% / 0% 50% 50% 100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                {/* Price Display */}
                {viewMode === 3 ? (
                  <>
                    {/* PricingPlanThree price display */}
                    <p className="md:text-7xl text-5xl font-bold mb-2">
                      {plan.currency === 'USD' ? '$' : plan.currency}
                      {plan.price}
                      <span className="md:text-4xl text-lg font-medium">/mes</span>
                    </p>
                    <p className="text-lg mb-2">
                      Total: {plan.currency === 'USD' ? '$' : plan.currency}
                      {(plan as PricingPlanThree).total}
                    </p>
                  </>
                ) : (
                  <>
                    {/* PricingPlanTwo price display */}
                    <div className="mb-2 flex flex-col items-center">
                      <p className="text-2xl text-violet-200 line-through">
                        {plan.currency === 'USD' ? '$' : plan.currency}
                        {(plan as PricingPlanTwo).discountPrice}
                      </p>
                      <p className="text-white text-lg font-bold italic">
                        Ahorra {plan.currency === 'USD' ? '$' : plan.currency}
                        {(plan as PricingPlanTwo).savings}
                      </p>
                      <p className="text-7xl font-bold mb-2">
                        {plan.currency === 'USD' ? '$' : plan.currency}
                        {plan.price}
                      </p>
                    </div>
                  </>
                )}

                <p className="md:text-xl text-lg text-white my-10">
                  {plan.description}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-8 pt-4">
                <ul className="text-left my-4 space-y-2 md:text-lg">
                  {[
                    "Recogido",
                    "Traslado*",
                    "Traslado a nuestras facilidades",
                    "Tramitación de permisología",
                    "Proceso de cremación",
                    "Preparación de certificaciones",
                    "Urna alterna**",
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
                <a
                  href={`/subscription?priceId=${plan.link}`}
                  className="mt-6 w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-primary-700 transition block text-center"
                >
                  Contrata Ahora
                </a>
              </div>
            </div>
          ))}
        </div>
        <h1 className="my-5 italic">
          *De ser necesario se llevará Instituto de Ciencias Forenses.
        </h1>
        <h1 className="my-5 italic">
          **Si desea una urna de lujo puede visitar nuestra sección de{" "}
          <a href="/urnas" className="text-blue-400 underline">
            urnas
          </a>
          .
        </h1>
      </div>
    </section>
  );
};

export default PricingSection;
