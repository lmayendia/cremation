import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import CTASection from "@/components/CTASection";
import ComparisonSection from "@/components/ComparissonSection";
import FAQComponent from "@/components/FAQ";
import Hero from "@/components/Hero";
import PlanningSection from "@/components/PlanningSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/Testimonials";
import { Plan } from '@/types';
import Popup from '@/components/PopUp';

export default async function Home() {

  const cookieStore = cookies();
  const country = (cookieStore.get('user-country')?.value ?? 'US').toLowerCase();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pricing/${country}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch pricing data.");
  }

  // Assuming the API response structure
  const planData = await response.json();
  // After fetching planData
  const discountPlan = planData.data.find((plan: Plan) => plan.discountPrice !== null);
  console.log(planData)
  // Find the plan with the lowest price
  const cheapestPlan = planData.data.reduce((minPlan: Plan | null, plan: Plan) => {
    return minPlan && minPlan.price < plan.price ? minPlan : plan;
  }, null);

  const subscription_price = cheapestPlan ? cheapestPlan.price : null;
  return (
    <div >
      <main>
        <Hero />
        <div className="custom-gradient">
          <PlanningSection />
          <ComparisonSection
            full_price={discountPlan.price}
            discount_price={discountPlan.discountPrice}
            subscription_price={subscription_price}
            currency={planData.data[0].currency}
          />          
          <CTASection />
          <TestimonialsSection />
          <PricingSection plans={planData.data} />
          <Popup/>
        </div>
        <FAQComponent />
      </main>
    </div>
  );
}
