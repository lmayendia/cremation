export interface IpRange {
    start_ip: string;
    end_ip: string;
    country_code: string;
    country_name: string;
    region_name: string;
    city_name: string;
  }

export interface ChartData {
  name: string;
  Costo: number;
}

// Define the return type for the useInView hook
export type UseInViewReturn = readonly [boolean, React.RefObject<HTMLElement>];

// Define types
export type PricingPlanThree = {
  name: string;
  price: string;
  period: string; // Added period property
  total: string;
  description: string;
  link:string;
};

export type PricingPlanTwo = {
  name: string;
  price: string;
  discountPrice: string;
  savings: string; 
  description: string;
  link:string;
};

export const isPricingPlanThree = (
  plan: PricingPlanThree | PricingPlanTwo
): plan is PricingPlanThree => {
  return (plan as PricingPlanThree).period !== undefined;
};
