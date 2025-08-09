// services/homepage.ts
import { query } from '@/lib/strapi';

export async function getHomepage(
  country: string = 'pr',
  locale: string = 'es'
) {
  const qs =
    `homepages?filters%5Bcountry%5D%5B%24eq%5D=${country}` + // pr, us, etc.
    `&locale=${locale}` +                                     // es, en, etc.
    `&populate=TestimoniosSection.testimonials.image` +
    `&populate=HeroSection` +
    `&populate=PlanificarSection` +
    `&populate=CompareSection.section1` +
    `&populate=CompareSection.section2.gridItems` +
    `&populate=CompareSection.section3.gridItems` +
    `&populate=CallToAction` +
    `&populate=FAQ` +
    `&populate=Pricing`;

  // → /api/homepages?filters%5Bcountry%5D%5B%24eq%5D=pr&locale=es&populate=…
  try {
    const res = await query(qs);
    console.log('Strapi response:', res.data[0].TestimoniosSection.testimonials);
    return res?.data[0];
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}