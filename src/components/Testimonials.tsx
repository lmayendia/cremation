import { Review } from '@/types';
import Image from 'next/image';
import React from 'react';

interface TestimonialsSectionProps {
  testimonialsData: {
    title: string;
    testimonials: Review[];
  };
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonialsData }) => {
  const { title, testimonials } = testimonialsData;
  
  return (
    <section className="md:py-32 pt-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-6xl font-bold text-gray-800 md:mb-24 mb-6 md:p-0 p-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:p-0 p-6">
          {testimonials.map((testimonial) => {
            const imageUrl = testimonial.img[0]?.url; // use the first image in the array
            return (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-110"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 relative">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={testimonial.name}
                        className="rounded-full object-cover"
                        fill
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      src="/icons/star.svg"
                      alt="Star"
                      width={24}
                      height={24}
                      className="text-yellow-400 drop-shadow-md"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;