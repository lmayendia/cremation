import Image from 'next/image';
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Juan Pérez",
      location: "San Juan, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
    {
      name: "María Gómez",
      location: "Mayagüez, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
    {
      name: "Carlos Rivera",
      location: "Ponce, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
    {
      name: "Ana Martínez",
      location: "Carolina, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
    {
      name: "Luis Rodríguez",
      location: "Bayamón, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
    {
      name: "Sofía Morales",
      location: "Arecibo, Puerto Rico",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae.",
      img: "/images/profile.jpg"
    },
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-24">
          DESCUBRE LO QUE NUESTROS CLIENTES TIENEN PARA DECIR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg transition transform hover:scale-110">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
