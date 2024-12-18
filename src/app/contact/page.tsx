'use client';
import ContactForm from '@/components/ContactForm';
import { Stain } from '@/components/Stain';
import React from 'react';

const ClientContact: React.FC = () => {
  return (
    <div className="py-12 bg-primary-500 text-white relative overflow-hidden -z-20">
      <h1 className="text-center text-5xl z-10">Nuestros métodos de contacto:</h1>
      <div className="relative flex md:flex-row flex-col justify-center items-start z-10">
        <div className="text-center md:text-left md:max-w-lg ">
          <h1 className="text-4xl font-bold mt-44 mb-2 ">Para atención inmediata:</h1>
          <h4 className='text-xl mb-6'>Puedes llamarnos directamente a nuestra oficina y consultar por cualquier información</h4>
          <div className='border-b-1 md:mx-0 mx-12 border border-white mb-12'></div>
            <a href="tel:555-555555" className="px-6 py-4 text-xl bg-black rounded-xl">
                555-555-5555
            </a>
        </div>
        <div className="max-w-2xl p-12">
          <ContactForm />
        </div>
      </div>
      {/* Stain in the background */}
      <div className="absolute inset-0 md:w-full md:h-full w-1/2 h-96 translate-x-full translate-y-52 md:translate-x-1/4 md:-translate-y-12 z-0 ">
        <Stain />
      </div>
    </div>
  );
};

export default ClientContact;
