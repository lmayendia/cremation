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
import { getHomepage } from "@/services/homepage";
import { mapCompareSection } from "@/lib/mapCompareSection";

export default async function Home() {

  // const cookieStore = cookies();
  // const country = (cookieStore.get('user-country')?.value ?? 'PR').toLowerCase();
  const page = await getHomepage();   // ← returns an array
  
  const testimonios = {
    title: page?.TestimoniosSection?.title ?? '',
    testimonials: page?.TestimoniosSection?.testimonials.map((t: any) => ({
      id: t.id,
      name: t.name,
      location: t.location,
      testimonial: t.testimonial,
      img: [
        {
          id: t.image.id,
          documentId: t.image.documentId,
          url: t.image.url,
        },
      ],
    })) ?? [],
  };
  // pull exactly the props your components already expect
  const heroContent             = page.HeroSection;
  const planningSectionContent  = page.PlanificarSection;
  const ctaSectionContent       = page.CallToAction;
  const FAQ              = page.FAQ;
  const precios = page.Pricing;


  // // Find the one-time payment price (where isSubscription is false)
  const oneTimeData = precios.find((item: Plan) => !item.isSubscription);

  if (!oneTimeData) {
    throw new Error("No one-time payment price found in the response.");
  }
  const compare = mapCompareSection(page.CompareSection.section1, oneTimeData.currency);

  // Filter subscription prices and find the cheapest one
  const subscriptionData = precios.filter((item: Plan) => item.isSubscription);
  const cheapestSubscriptionData = subscriptionData.reduce((prev: Plan, curr: Plan) =>
    prev.price < curr.price ? prev : curr
  );

  if (!cheapestSubscriptionData) {
    throw new Error("No subscription price found in the response.");
  }


  return (
    <div >
      <main>
        <Hero 
          mainHeading={heroContent.mainHeading}
          description={heroContent.description}
          primaryButtonText={heroContent.primaryButtonText}
          secondaryButtonText={heroContent.secondaryButtonText}
          mapSectionTitle={heroContent.mapSectionTitle}
        />
        <div className="custom-gradient">
          <PlanningSection 
            mainHeading={planningSectionContent.mainHeading}
            description={planningSectionContent.description}
            highlightedText1={planningSectionContent.highlightedText1}
            highlightedText2={planningSectionContent.highlightedText2}
            highlightedText3={planningSectionContent.highlightedText3}
          />
          <ComparisonSection
            oneTimePrice={oneTimeData.price}
            subscriptionPrice={cheapestSubscriptionData.price}
            currency={oneTimeData.currency}
            section1={compare.section1}
            section2={page.CompareSection.section2}
            section3={page.CompareSection.section3}
          />
          <CTASection 
            mainHeading={ctaSectionContent.mainHeading}
            description={ctaSectionContent.description}
            highlightedText={ctaSectionContent.highlightedText}
            buttonText={ctaSectionContent.buttonText}
          />
          <TestimonialsSection testimonialsData={testimonios} />
          <CreativePricing plans={precios}/>
          <Popup  plan={oneTimeData}/>
        </div>
        <FAQComponent FAQ={FAQ} />
      </main>
    </div>
  );
}
