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
import { ChartData, ComparisonSectionProps, UseInViewReturn } from '@/types'; // Import your types

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

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ full_price, discount_price, subscription_price, currency }) => {
  const [isInView1, ref1] = useInView(0.2);
  const [isInView2, ref2] = useInView(0.3);
  const [isInView3, ref3] = useInView(0.4);

  // Data for the bar chart
  const data: ChartData[] = [
    { name: "Cremación", Costo: full_price },
    { name: "Entierro", Costo: 9995 },
  ];

  return (
    <div className="md:space-y-36 mb-32">
      {/* First Layout: Content | Chart */}
      <section
        id="about"
        ref={ref1}
        className={`relative h-auto bg-primary-500 md:py-24 py-6 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView1 ? "opacity-100" : "opacity-0"
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
              En <strong>Cremación Directa</strong>, te ofrecemos un plan completo de cremación por solo <strong>${discount_price}</strong> o por <strong className="font-extrabold">${full_price}</strong> en un solo pago, que incluye:
            </p>

            <div className="grid grid-cols-2 gap-4 md:mt-6">
              <div>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="md:text-xl text-white ml-2">
                      Recogido y traslado. <span className="italic"><br />De ser necesario se llevará al Instituto de Ciencias Forenses.</span>
                    </p>
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
            <p className="md:text-xl text-xl text-white line-through">$9,995</p>
            <p className="text-7xl text-primary-100 font-bold mt-2">${full_price}</p>
            <div className="w-full mx-auto mt-12 md:mt-8 md:px-12">
              <h1 className="text-2xl mb-12 text-white">Comparación entre precios de entierro y cremación</h1>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} layout="horizontal">
                  {/* X-Axis */}
                  <XAxis dataKey="name" type="category" tick={{ fill: 'white', fontSize: 14 }} />
                  {/* Y-Axis */}
                  <YAxis type="number" tick={{ fill: 'white', fontSize: 14 }} />
                  {/* Tooltip */}
                  <Tooltip contentStyle={{ backgroundColor: '#33C2DB', opacity: 0.9 }} cursor={{ 'fill': 'transparent' }} />
                  {/* Bars */}
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
        <div className="container mx-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Left Side: Image */}
          <div className="relative w-full md:h-5/6 rounded-xl overflow-hidden h-[350px]">
            <Image
              src="/images/family-happy.jpg"
              alt="Cremation Service"
              className="object-cover"
              fill
            />
          </div>

          {/* Right Side: Content with 2x2 Grid */}
          <div className="text-left px-6 sm:mt-6">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-800 uppercase md:leading-tight md:mb-20">
              Brindale paz a tus seres queridos
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-2 gap-2 md:gap-6 mt-6">
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
              <a href="#pricing">
                <button className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
                  SUSCRIBETE AHORA
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Third Layout: Content | Image with 2x2 grid */}
      <section
        ref={ref3}
        className={`relative h-auto md:py-12 sm:py-24 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView3 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto h-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Left Side: Content with 2x2 Grid */}

          {/* Right Side: Image */}
          <div className="relative md:w-full md:h-full rounded-xl overflow-hidden group md:hidden block h-[400px] mt-6 md:mt-09">
            <Image
              src="/images/holding-hand.jpg"
              alt="Funeral Service"
              className="object-cover w-full h-full"
              fill
            />
          </div>

          <div className="text-left px-6">
            <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-gray-800 ">
              CONGELA EL PRECIO DE HOY
            </h2>
            <div className="grid grid-cols-2 gap-6 md:mt-6">
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  👌 Pronto
                </h3>
                <p className="text-lg text-gray-600">
                  Comienza tu plan de cremación sin necesidad de hacer un pago inicial.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Precio ❄️
                </h3>
                <p className="text-lg text-gray-600">
                  Asegura el costo actual de nuestros servicios y protégete de futuros aumentos.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  {currency === 'USD' ? '$' : currency} {subscription_price} 💸
                </h3>
                <p className="text-lg text-gray-600">
                  Comienza con pagos mensuales accesibles, brindando tranquilidad con un plan completo.
                </p>
              </div>
              <div>
                <h3 className="md:text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full px-4 py-2 my-10 text-start">
                  Inmediato💨
                </h3>
                <p className="text-lg text-gray-600">
                  El contratante puede disfrutar del servicio desde el primer día.
                </p>
              </div>
            </div>
            <div className="md:py-16 pt-16">
              <a href="#pricing">
                <button className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
                  SUSCRIBETE AHORA
                </button>
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full h-5/6 rounded-xl overflow-hidden md:block hidden">
            <Image
              src="/images/daughter-with-parents.jpg"
              alt="Funeral Service"
              className="object-cover w-full h-full"
              fill
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonSection;