import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-gray-100 py-12">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side: Logo and Rights */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 ">
          <div className="text-2xl font-bold ">
            <Link href="/">
            <Image
            src='/images/logo-white.png'
            width={200}
            height={200}
            alt="Logo Cremacion Directa"
            >

            </Image>
            </Link>
          </div>
          <p className="text-sm mt-12 border-t-2 pt-6">
            &copy; {new Date().getFullYear()} CremacionDirecta. All rights reserved.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10 text-xl border-b-2">
          <Link className="link-button hover:font-bold py-2" href="/planes">
            Planes
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/services">
            Servicios
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/urnas">
            Urnas
          </Link>
          <Link className="link-button hover:font-bold py-2" href="/contact">
            Contacto
          </Link>
          <Link className="hover:font-bold py-2" href="/terms">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
