import Image from "next/image";
import MapSvg from "./Map";

const Hero: React.FC = () => {

  return (
    <div className="relative h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left half with parallax effect */}
      <div className="w-full md:w-1/2 h-full bg-primary-500 md:bg-primary-gradient flex flex-col items-start justify-center pt-28 md:mt-0 md:justify-center text-white p-6 md:py-60 md:px-16">
        
      <Image
          src="/images/logo-white-2.png"
          alt="Cremacion Directa Logo"
          width={300}
          height={300}
          className="lg:h-[350px] lg:w-[350px] md:h-[100px] md:w-[200px] hidden md:block sm:mx-start mb-5"
          priority
        />
        <div className="mb-12 border-t-2 border-white w-full -translate-x-1/4 md:hidden"></div>
        
        <h1 className="text-4xl lg:text-7xl font-bold leading-tight uppercase">
          Planifica con salud y vida, el camino a la vida eterna
        </h1>
        <p className="mt-4 text-base lg:text-2xl md:max-w-2xl max-w-maxxl py-5">
          Protege tu futuro o el de tus seres queridos con nuestros planes accesibles.
          <br />
          <br />
          Desde solo <span className="font-extrabold">$19.95</span> al mes, puedes asegurar un servicio de cremación completo y transferible, disponible cuando más se necesite.
        </p>
        <div className="mt-10 md:mt-20 flex space-x-4">
          <a href="#about">
          <button className="btn-1 relative font-bold text-white text-base lg:text-xl py-3 md:py-4 px-4 md:px-6 rounded overflow-hidden group hover:bg-transparent transition-all duration-300 ease-in-out" >
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
              DESCUBRE MÁS
            </span>
            {/* SVG Rectangle for Border Animation */}
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" viewBox="0 0 110 45" preserveAspectRatio="none">
              <rect x="1" y="1" width="106" height="41" />
            </svg>
          </button>
            </a>

          <div className="relative">
            
          <a href="#pricing">

            <button className="relative transform hover:scale-105 duration-300 font-bold bg-secondary-600 text-white text-base lg:text-xl py-3 md:py-4 px-4 md:px-6 rounded hover:bg-secondary-700 transition z-20">
              SUBSCRIBETE AHORA
            </button>
            </a>
            {/* Ripple Effect Behind the Button */}
            <div className="absolute inset-0 z-10 ripple-container"></div>
          </div>
        </div>
        <div className=" mt-12 border-t-2 border-white w-full translate-x-1/3 md:hidden"></div>
      </div>

      <div className="relative w-full md:w-1/2 overflow-hidden hidden md:block bg-primary-500">
        {/* Placeholder for the inline SVG */}
        <div className="absolute bottom-96 left-0 hidden lg:block">
          <h1 className="uppercase text-xl text-white font-bold">Estamos donde nos necesitas</h1>
        </div>

        {/* Map with hover text */}
        <div className="w-full h-full mt-28 object-fill">
          <MapSvg />
        </div>
      </div>

    </div>
  );
};

export default Hero;
