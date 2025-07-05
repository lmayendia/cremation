// import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import CTASection from "@/components/CTASection";
import ComparisonSection from "@/components/ComparissonSection";
import Hero from "@/components/Hero";
import PlanningSection from "@/components/PlanningSection";
import TestimonialsSection from "@/components/Testimonials";
import Popup from '@/components/PopUp';
import CreativePricing from '@/components/PricingSection2';
// import { query } from '@/lib/strapi';
import { Plan } from '@/types';
import { FAQComponent } from '@/components/FAQ';

export default async function Home() {

  // const cookieStore = cookies();
  // const country = (cookieStore.get('user-country')?.value ?? 'PR').toLowerCase();
  // const response = await query(`home-${country}?populate[Testimonios][populate]=img&populate[Precios]=*&populate[FAQ]=*`);

  // const precios: Plan[] = response.data.Precios;
  const precios: Plan[] = [
    {
      id: 1,
      name: 'Plan Individual',
      price: 20,
      description: 'Plan mensual para una persona',
      link: '/plan-individual',
      currency: 'USD',
      isSubscription: true,
      featured: null,
      features: ['Servicio de cremación completo', 'Urna básica incluida', 'Asistencia 24/7', 'Documentación legal']
    },
    {
      id: 2,
      name: 'Plan Familiar',
      price: 45,
      description: 'Plan mensual para hasta 5 personas',
      link: '/plan-familiar',
      currency: 'USD',
      isSubscription: true,
      featured: true,
      features: ['Cobertura para hasta 5 personas', 'Servicio de cremación completo', 'Urna básica incluida', 'Asistencia 24/7', 'Documentación legal', 'Prioridad en atención']
    },
    {
      id: 3,
      name: 'Plan Pago Único',
      price: 995,
      description: 'Pago único para una persona',
      link: '/plan-unico',
      currency: 'USD',
      isSubscription: false,
      featured: null,
      features: ['Servicio de cremación completo', 'Urna premium incluida', 'Asistencia 24/7', 'Documentación legal', 'Sin pagos mensuales']
    }
  ];
  // const testimonios = response.data.Testimonios;
  const testimonios = [
    {
      id: 1,
      name: 'María Rodríguez',
      location: 'San Juan, Puerto Rico',
      testimonial: 'El servicio fue excepcional en un momento tan difícil. El plan mensual nos dio tranquilidad y el personal fue muy compasivo durante todo el proceso. Definitivamente recomiendo sus servicios.',
      img: [{
        id: 1,
        documentId: 'testimonial1',
        url: '/images/profile.jpg'
      }]
    },
    {
      id: 2,
      name: 'Carlos Méndez',
      location: 'Ponce, Puerto Rico',
      testimonial: 'El plan familiar nos ha dado mucha paz mental. Saber que toda la familia está cubierta por un precio tan accesible es invaluable. El servicio fue profesional y respetuoso.',
      img: [{
        id: 2,
        documentId: 'testimonial2',
        url: '/images/profile.jpg'
      }]
    },
    {
      id: 3,
      name: 'Ana Martínez',
      location: 'Mayagüez, Puerto Rico',
      testimonial: 'La atención y el respeto con el que trataron a mi familia fue conmovedor. El proceso fue transparente y nos mantuvieron informados en cada paso. El plan mensual es una excelente opción.',
      img: [{
        id: 3,
        documentId: 'testimonial3',
        url: '/images/profile.jpg'
      }]
    },
    {
      id: 4,
      name: 'José González',
      location: 'Arecibo, Puerto Rico',
      testimonial: 'Optamos por el plan de pago único y fue la mejor decisión. El servicio fue impecable y el personal nos ayudó con toda la documentación necesaria. Muy agradecido con su profesionalismo.',
      img: [{
        id: 4,
        documentId: 'testimonial4',
        url: '/images/profile.jpg'
      }]
    },
    {
      id: 5,
      name: 'Laura Torres',
      location: 'Bayamón, Puerto Rico',
      testimonial: 'El plan familiar nos ha permitido proteger a toda nuestra familia por un precio muy razonable. La atención fue personalizada y el proceso fue muy sencillo. Recomiendo ampliamente sus servicios.',
      img: [{
        id: 5,
        documentId: 'testimonial5',
        url: '/images/profile.jpg'
      }]
    },
    {
      id: 6,
      name: 'Roberto Sánchez',
      location: 'Carolina, Puerto Rico',
      testimonial: 'La tranquilidad que nos da el plan mensual es invaluable. El servicio fue excepcional y el personal nos trató con mucho respeto y empatía. Definitivamente volveríamos a elegirlos.',
      img: [{
        id: 6,
        documentId: 'testimonial6',
        url: '/images/profile.jpg'
      }]
    }
  ];
  console.log(testimonios[0].img);
  // const FAQ = response.data.FAQ;
  const FAQ = [
    {
      id: 1,
      title: '¿Qué servicios están incluidos en el plan mensual?',
      answer: 'Nuestro plan mensual incluye todos los servicios de cremación, documentación legal, urnas básicas, y asistencia 24/7. El plan individual cuesta $20 mensuales por persona, mientras que el plan familiar de 5 personas tiene un costo de $45 mensuales.'
    },
    {
      id: 2,
      title: '¿Cómo funciona el proceso de cremación?',
      answer: 'El proceso de cremación es respetuoso y profesional. Incluye la recogida del cuerpo, preparación, cremación en instalaciones certificadas, y entrega de las cenizas en una urna. Todo el proceso está supervisado por personal capacitado.'
    },
    {
      id: 3,
      title: '¿Qué documentación legal necesito?',
      answer: 'Necesitará el certificado de defunción, autorización de cremación firmada por el familiar más cercano, y documentos de identidad. Nuestro personal le ayudará a obtener toda la documentación necesaria.'
    },
    {
      id: 4,
      title: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puede actualizar su plan en cualquier momento. Si desea cambiar de plan individual a familiar, o viceversa, solo necesita contactarnos y haremos los ajustes necesarios.'
    },
    {
      id: 5,
      title: '¿Qué sucede si fallezco en otra ciudad?',
      answer: 'Nuestro servicio incluye la coordinación para el traslado del cuerpo desde cualquier lugar del país. Trabajamos con una red de proveedores para asegurar un servicio sin complicaciones.'
    },
    {
      id: 6,
      title: '¿Puedo pre-planificar el servicio para mi familia?',
      answer: 'Sí, es una excelente idea pre-planificar. Puede incluir a hasta 5 miembros de su familia en el plan familiar por $45 mensuales, asegurando que todos estén cubiertos.'
    },
    {
      id: 7,
      title: '¿Qué opciones de urnas ofrecen?',
      answer: 'Ofrecemos una variedad de urnas, desde modelos básicos hasta diseños personalizados. El plan mensual incluye una urna básica, pero puede actualizar a modelos más elaborados por un costo adicional.'
    },
    {
      id: 8,
      title: '¿Cómo se manejan las cenizas después de la cremación?',
      answer: 'Las cenizas se entregan en una urna sellada. Usted puede decidir si desea conservarlas, esparcirlas en un lugar significativo, o colocarlas en un nicho. Le asesoramos sobre todas las opciones disponibles.'
    },
    {
      id: 10,
      title: '¿Qué sucede si cancelo el plan mensual?',
      answer: 'Puede cancelar el plan en cualquier momento. Sin embargo, le recomendamos mantener el plan activo para asegurar la cobertura completa del servicio cuando sea necesario.'
    }
  ];
  // Find the one-time payment price (where isSubscription is false)
  const oneTimeData = precios.find((item) => !item.isSubscription);

  if (!oneTimeData) {
    throw new Error("No one-time payment price found in the response.");
  }

  // Filter subscription prices and find the cheapest one
  const subscriptionData = precios.filter((item) => item.isSubscription);
  const cheapestSubscriptionData = subscriptionData.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );

  if (!cheapestSubscriptionData) {
    throw new Error("No subscription price found in the response.");
  }

  // Pass the values to the component
  <ComparisonSection
    oneTimePrice={oneTimeData.price}
    subscriptionPrice={cheapestSubscriptionData.price}
    currency={oneTimeData.currency}
  />;

  return (
    <div >
      <main>
        <Hero />
        <div className="custom-gradient">
          <PlanningSection />
          <ComparisonSection
            oneTimePrice={995}
            subscriptionPrice={9.95}
            currency="USD"
          />
          <CTASection />
          <TestimonialsSection testimonials={testimonios} />
          <CreativePricing plans={precios}/>
          <Popup  plan={oneTimeData}/>
        </div>
        <FAQComponent FAQ={FAQ} />
      </main>
    </div>
  );
}
