"use client";
import { useState } from "react";
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

// Function to observe when elements enter and exit the viewport
const useInView = (threshold = 0.6) => {
  const [isInView, setInView] = useState(false);
  const ref = (element: never) => {
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        { threshold }
      );
      observer.observe(element);
      return () => observer.unobserve(element); // Clean up observer
    }
  };
  return [isInView, ref] as const;
};

const ComparisonSection = () => {
  const [isInView1, ref1] = useInView(0.5); // Visible at 60% viewport
  const [isInView2, ref2] = useInView(0.6); // For Image | Content (with 2x2 grid)
  const [isInView3, ref3] = useInView(0.3); // For Content | Image (with 2x2 grid)

  // Data for the bar chart
  const data = [
    { name: "Cremación", Costo: 1396 },
    { name: "Entierro", Costo: 9995 },
  ];

  return (
    <div className="space-y-36 mb-32">
      {/* First Layout: Content | Chart */}
      <section
        ref={ref1}
        className={`relative h-auto bg-primary-800 py-24 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView1 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Left Side: Heading, Subheading and List */}
          <div
            ref={ref1}
            className="text-left">
            <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-white uppercase mb-12">
              Descubre porque la cremación es tu mejor opción:
            </h2>
            <p className="mt-4 text-lg md:text-2xl text-white mb-12">
              De acuerdo con la <a href="https://nfda.org">NFDA</a>, el costo promedio de un entierro tradicional ronda los $9,995. 
              A esto se suman los costos de adquirir una parcela, la lápida, las flores y otros gastos administrativos, lo que puede {" "}
              <strong>aumentar considerablemente</strong> el total.
            </p>
            <p className="mt-4 text-lg md:text-2xl text-white mb-12">
              En <strong>Cremación Directa</strong>, te ofrecemos un plan completo de cremación por solo <strong>$995</strong>, que incluye:
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Recogido y traslado al Instituto de Ciencias Forenses.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Traslado a nuestras facilidades.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Tramitación de toda la permisología.</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Proceso completo de cremación.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Preparación de todas las certificaciones necesarias.</p>
                  </li>
                  <li className="flex items-start">
                    <Image src="/icons/check.svg" alt="check icon" width={24} height={24} />
                    <p className="text-xl text-white ml-2">Urna temporera.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          {/* Right Side: Prices and Chart */}
          <div className="text-center mb-8">
            <p className="text-xl text-white line-through"> $9,995 </p>
            <p className="text-7xl text-primary-200 font-bold mt-2"> $1,396 </p>
            <div className="w-full mx-auto mt-8 px-12">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} layout="vertical">
                  <XAxis type="number" tick={{ fill: 'white', fontSize: 14 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fill: 'white', fontSize: 14 }}
                  />
                  {/* Custom Tooltip */}
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
        className={`relative h-auto py-10 flex flex-col items-center justify-center transition-opacity duration-700 ${isInView2 ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between">
          {/* Left Side: Image */}
          <div className="relative w-full h-full rounded-xl overflow-hidden group">
            <Image
              src="/images/cremation-service.jpg"
              alt="Cremation Service"
              className="object-cover w-full h-full"
              layout="fill"
              loading="lazy"
            />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect className="stroke-rect" x="0" y="0" width="100" height="100" rx="1" ry="1" fill="none" />
            </svg>
          </div>



          {/* Right Side: Content with 2x2 Grid */}
          <div className="text-left p-12">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-800 uppercase md:leading-tight">
              Brindale paz a tus seres queridos
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl  transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Reduce el estrés
                </h3>
                <p className="text-lg text-gray-600">
                  Al planificar con nosotros, eliminas la carga emocional y
                  financiera que los familiares suelen enfrentar en momentos difíciles.
                </p>
              </div>
              <div>
                <h3 className="text-xl  transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Apoyo en el Proceso
                </h3>
                <p className="text-lg text-gray-600">
                  Nuestros planes incluyen servicios completos de cremación, asegurando
                  que tus seres queridos no tengan que preocuparse por la logística ni trámites.
                </p>
              </div>
              <div>
                <h3 className="text-xl  transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Transparencia de Costos
                </h3>
                <p className="text-lg text-gray-600">
                  Con un plan claro y sin costos ocultos, tus familiares sabrán exactamente qué esperar y podrán concentrarse en despedirse sin angustias financieras.
                </p>
              </div>
              <div>
                <h3 className="text-xl  transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Respaldo y Tranquilidad
                </h3>
                <p className="text-lg text-gray-600">
                  Nuestros servicios están diseñados para ofrecer tranquilidad y asegurar que todo esté gestionado de manera respetuosa, cuidando cada detalle en el proceso.
                </p>
              </div>
            </div>
            <div className="py-16">
              <button
                className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
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
          <div className="text-left p-12">
            <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-gray-800 ">
              CONGELA EL PRECIO DE HOY
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Zero Pronto
                </h3>
                <p className="text-lg text-gray-600">
                Comienza tu plan de cremación sin necesidad de hacer un pago inicial. Ofrecemos cuotas accesibles y sin intereses,
                lo que te permite obtener tranquilidad sin preocuparte por un desembolso inmediato.
                </p>
              </div>
              <div>
                <h3 className="text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Congela el precio
                </h3>
                <p className="text-lg text-gray-600">
                  Puedes asegurar el costo actual de nuestros servicios, protegiéndote de futuros aumentos. Esto te permite pagar hoy un precio fijo, 
                  y el plan seguirá siendo válido sin importar si los precios suben en el futuro.
                </p>
              </div>
              <div>
                <h3 className="text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Desde $19,95
                </h3>
                <p className="text-lg text-gray-600">
                Comienza con pagos mensuales accesibles, brindándote 
                tranquilidad con un plan completo por una tarifa baja, ajustada a tu presupuesto.
                </p>
              </div>
              <div>
                <h3 className="text-xl transition delay-100 transform hover:scale-105 font-semibold text-white bg-black rounded-full inline-block px-4 py-2 my-10 text-start">
                  Desde el primer día
                </h3>
                <p className="text-lg text-gray-600">
                  El contratante puede disfrutar del servicio desde el primer día, 
                  sin necesidad de saldar la totalidad del plan
                </p>
              </div>
              <div className="py-16">
                  <button
                    className="border-0 rounded-lg md:text-xl bg-primary-700 text-white font-bold inline-block px-6 py-3 transition delay-100 transform hover:scale-105">
                    SUSCRIBETE AHORA
                  </button>
                </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full h-full rounded-xl overflow-hidden group">
            <Image
              src="/images/funeral-service.jpg"
              alt="Funeral Service"
              className="object-cover w-full h-full"
              layout="fill"
              loading="lazy"
            />

            {/* Adjusted SVG border */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect className="stroke-rect" x="0" y="0" width="100" height="100" rx="1" ry="1" fill="none" />
            </svg>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ComparisonSection;
