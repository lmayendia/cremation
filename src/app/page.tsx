import CTASection from "@/components/CTASection";
import ComparisonSection from "@/components/ComparissonSection";
import FAQComponent from "@/components/FAQ";
import Hero from "@/components/Hero";
import PlanningSection from "@/components/PlanningSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/Testimonials";
// import Image from "next/image";

export default function Home() {
  return (
    <div >
      <main>
        <Hero />
        <div className="custom-gradient">
          <PlanningSection />
          <ComparisonSection />
          <CTASection />
          <TestimonialsSection />
          <PricingSection />
        </div>
        <FAQComponent />
      </main>
    </div>
  );
}
