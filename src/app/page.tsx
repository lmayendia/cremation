import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import CTASection from "@/components/CTASection";
import ComparisonSection from "@/components/ComparissonSection";
import Hero from "@/components/Hero";
import PlanningSection from "@/components/PlanningSection";
import TestimonialsSection from "@/components/Testimonials";
import Popup from '@/components/PopUp';
import CreativePricing from '@/components/PricingSection2';
import { query } from '@/lib/strapi';
import { Plan } from '@/types';
import { FAQComponent } from '@/components/FAQ';

export default async function Home() {

  const cookieStore = cookies();
  const country = (cookieStore.get('user-country')?.value ?? 'US').toLowerCase();
  const response = await query(`home-${country}?populate[Testimonios][populate]=img&populate[Precios]=*&populate[FAQ]=*`);

  // Extracting the prices from the API response
  const precios: Plan[] = response.data.Precios;
  const testimonios = response.data.Testimonios;
  const FAQ = response.data.FAQ;
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
