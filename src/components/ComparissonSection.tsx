"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Cookies from 'js-cookie'; // For reading cookies
import { ChartData, UseInViewReturn } from '@/types'; // Import your types

// Function to observe when elements enter and exit the viewport
const useInView = (threshold: number = 0.6): UseInViewReturn => {
  const [isInView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
      setInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, { threshold });
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [isInView, ref] as const;
};

const ComparisonSection = () => {
  const [isInView1, ref1] = useInView(0.3);
  const [isInView2, ref2] = useInView(0.3);
  const [isInView3, ref3] = useInView(0.4);
  
  // Read user-country cookie
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    // Log all cookies
    console.log("All cookies:", document.cookie);
  
    const userCountry = Cookies.get('user-country');
    console.log("user-country cookie:", userCountry);
  
    if (userCountry) {
      setCountry(userCountry);
    }
  }, []);
  

  // Define costs for each country
  const countryCosts: { [key: string]: number } = {
    US: 1999,
    PR: 1396,
    CO: 750
  };

  // Determine the cost based on the country, default to 1396 if country is not found
  const cremationCost = country ? countryCosts[country] || 1396 : 1396;

  // Data for the bar chart
  const data: ChartData[] = [
    { name: "Cremación", Costo: cremationCost },
    { name: "Entierro", Costo: 9995 },
  ];


  return (
    <div className="md:space-y-36 mb-32">
      {/* First Layout: Content | Chart */}
      <section
        ref={ref1}
        className={`relative h-auto bg-primary-800 md:py-24 py-6 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView1 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center overflow-hidden">
          {/* Left Side: Heading, Subheading and List */}
          <div className="text-left p-6">
            <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-white uppercase mb-12">
              Descubre porque la cremación es tu mejor opción:
            </h2>
            <p className="mt-4 text-lg md:text-2xl text-white mb-12">
              De acuerdo con la <a className="italic" href="https://nfda.org">NFDA</a>, el costo promedio de un entierro tradicional ronda los <strong>$9,995</strong>. A esto se suman los costos de adquirir una parcela, la lápida, las flores y otros gastos administrativos, lo que puede <strong>aumentar considerablemente</strong> el total.
            </p>
            <p className="mt-4 text-lg md:text-2xl text-white mb-12">
              En <strong>Cremación Directa</strong>, te ofrecemos un plan completo de cremación por solo <strong className="font-extrabold">${cremationCost}</strong>, que incluye:
            </p>

            <div className="grid grid-cols-2 gap-4 md:mt-6">
              <div>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Recogido y traslado al Instituto de Ciencias Forenses.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Traslado a nuestras facilidades.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Tramitación de toda la permisología.</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Proceso completo de cremación.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Preparación de todas las certificaciones necesarias.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">Urna temporera.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right Side: Prices and Chart */}
          <div className="text-center my-8">
            <p className="md:text-xl text-xl text-white line-through"> $9,995 </p>
            <p className="text-7xl text-primary-200 font-bold mt-2"> ${cremationCost} </p>
            <div className="w-full mx-auto mt-24 md:mt-8 md:px-12">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" tick={{ fill: 'white', fontSize: 14 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fill: 'white', fontSize: 14 }}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#33C2DB', opacity: 0.7 }} />
                  <Bar dataKey="Costo" barSize={50}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Cremación" ? "#99C9FF" : "#C0C0C0"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Second Layout: Image | Content with 2x2 grid */}
      <section
        ref={ref2}
        className={`relative h-auto pt-10 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView2 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between">
          {/* Left Side: Image */}
          <div className="relative w-full h-full rounded-xl overflow-hidden group md:block hidden">
            <Image
              src="/images/cremation-service.jpg"
              alt="Cremation Service"
              className="object-cover w-full h-full"
              fill
              loading="lazy"
            />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect className="stroke-rect" x="0" y="0" width="100" height="100" rx="1" ry="1" fill="none" />
            </svg>
          </div>

          {/* Right Side: Content with 2x2 Grid */}
          <div className="text-left p-12">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-800 uppercase md:leading-tight md:mb-20">
              Brindale paz a tus seres queridos
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 mt-6">
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Reduce el estrés 🔻
                </h3>
                <p className="text-lg text-gray-600">
                  Al planificar con nosotros, eliminas la carga emocional y financiera.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Apoyo en el Proceso 🤝
                </h3>
                <p className="text-lg text-gray-600">
                  Nuestros planes incluyen servicios completos de cremación.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Transparencia 📝
                </h3>
                <p className="text-lg text-gray-600">
                  Plan claro y sin costos ocultos.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Tranquilidad 🧘‍♀️
                </h3>
                <p className="text-lg text-gray-600">
                  Nuestros servicios están diseñados para respaldarte y ofrecerte tranquilidad en el proceso.
                </p>
              </div>
            </div>
            <div className="md:py-16 pt-16">
              <button className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
                SUSCRIBETE AHORA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Third Layout: Content | Image with 2x2 grid */}
      <section
        ref={ref3}
        className={`relative h-auto py-12 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView3 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Left Side: Content with 2x2 Grid */}
          <div className="text-left px-12">
            <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-gray-800 ">
              CONGELA EL PRECIO DE HOY
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 mt-6">
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  👌 Pronto
                </h3>
                <p className="md:text-lg text-gray-600">
                  Comienza tu plan de cremación sin necesidad de hacer un pago inicial.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Precio ❄️
                </h3>
                <p className="md:text-lg text-gray-600">
                  Asegura el costo actual de nuestros servicios y protégete de futuros aumentos.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  $19.95 💸
                </h3>
                <p className="md:text-lg text-gray-600">
                  Comienza con pagos mensuales accesibles, brindando tranquilidad con un plan completo.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Inmediato💨
                </h3>
                <p className="md:text-lg text-gray-600">
                  El contratante puede disfrutar del servicio desde el primer día.
                </p>
              </div>
            </div>
            <div className="md:py-16 pt-16">
              <button className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
                SUSCRIBETE AHORA
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full h-full rounded-xl overflow-hidden group  md:block hidden">
            <Image
              src="/images/funeral-service.jpg"
              alt="Funeral Service"
              className="object-cover w-full h-full"
              fill
              loading="lazy"
            />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect className="stroke-rect" x="0" y="0" width="100" height="100" rx="1" ry="1" fill="none" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonSection;
