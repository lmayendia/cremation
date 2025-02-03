import { Plan } from "@/types";


interface CreativePricingProps {
  plans: Plan[];
}

const PricingCard = ({ plan }: { plan: Plan }) => (
    <div className={`relative flex flex-col justify-between h-full p-8 transition-all 
        ${plan.featured ? "bg-primary-50 border-l-4 border-primary-500 bg-white" : "bg-white border-l-4 border-transparent"}
        hover:-translate-y-4 rounded-xl shadow-md`}>

        {plan.featured && (
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 z-10">
                <div className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Recomendado
                </div>
            </div>
        )}

        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
            <p className="text-lg text-gray-600 mb-6">{plan.description}</p>

            <div className="mb-8">
                <span className="text-5xl font-black text-primary-500">${plan.price}</span>
                <span className="text-lg text-gray-500 ml-2">
                    {plan.isSubscription === true ? "/mes" : "único"}
                </span>
            </div>

            <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                        <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                    </div>
                ))}
            </div>
        </div>

        <a href={`/subscription?priceId=${plan.link}`} className={`w-full py-4 px-6 rounded-lg font-bold transition-colors text-center
            ${plan.featured
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-gray-900 text-white hover:bg-gray-800"}`}>
            Comenzar {plan.featured && "→"}
        </a>
    </div>
);


const defaultFeatures = [
  "Cobertura continua durante el período de suscripción",
  "Activación inmediata al suscribirse",
  "Cancelación en cualquier momento",
  "Recogido profesional",
  "Traslado seguro*",
  "Facilidades propias",
  "Gestión de permisos",
  "Cremación certificada",
  "Urna estándar**",
  "Certificados legales",
  "Entrega personalizada",
];

export default function CreativePricing({ plans }: CreativePricingProps) {
  // Merge the default features into each plan
  const plansWithFeatures = plans.map((plan) => ({
    ...plan,
    features: defaultFeatures,
  }));

  return (
    <section className="py-24" id="pricing">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary-100 text-primary-600 px-6 py-3 rounded-full mb-8">
            <span className="mr-2">⭐</span>
            <span className="font-semibold">
              Más de 20 años protegiendo familias
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 uppercase">
            Planes diseñados para tu tranquilidad
          </h2>

          <div className="max-w-5xl mx-auto text-xl text-gray-600 space-y-4">
            <p>
              El presupuesto de cada familia es diferente. Es por eso que ofrecemos
              planes que se ajustan a todos los presupuestos. Tenemos planes con{" "}
              <strong className="uppercase text-black">cero pronto</strong> y todos
              nuestros planes, una vez pagos en su totalidad, son{" "}
              <strong className="text-black">
                100% transferibles a cualquier persona designada por el contratante.
              </strong>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-2 max-w-7xl mx-auto">
          {plansWithFeatures.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-gray-500 space-y-2">
          <p className="max-w-2xl mx-auto leading-relaxed">
            *El traslado incluye hasta 50 km de distancia<br />
            **Consulte nuestro catálogo premium de urnas conmemorativas
          </p>
          <div className="pt-4 text-gray-700 text-xs">
            Todos los planes incluyen transferibilidad completa a familiares designados
          </div>
        </div>
      </div>
    </section>
  );
}