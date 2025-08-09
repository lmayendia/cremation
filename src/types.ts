import { MouseEvent } from "react";

export interface HeroProps {
  logoSrc?: string;
  logoAlt?: string;
  mainHeading: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink?: string;
  secondaryButtonText: string;
  secondaryButtonLink?: string;
  mapSectionTitle: string;
}

export type HandlePlanesClick = (e: MouseEvent<HTMLAnchorElement>) => void;

export interface ChartData {
  name: string;
  Costo: number;
}

// Define the return type for the useInView hook
export type UseInViewReturn = readonly [boolean, React.RefObject<HTMLElement>];

export interface Plan {
  id: number;
  name: string;
  price: number;
  description: any[]; // Rich text array from Strapi
  link: string;
  currency: string;
  isSubscription: boolean;
  featured: boolean | null;
  features: string[];
}

export type UrnasResponse = {
  data: any[];
  meta: {
    pagination: any;
  };
};

export type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  imageUrl: string;
  url: string;
};

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  birth_date: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
  birth_date?: string;
}

export interface User {
  id?: number;
  documentId?: string;
  username?: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  nombre?: string;
  firstName?: string;
  lastName?: string;
  birth_date?: string;
  subscriptions?: SubscriptionData[];
  locale?: string | null;
  stripe_customer: {
    stripe_customer_id: string;
  };
}

export interface SuccessResponse<T> {
  data: T | null;
  error: null;
}

export interface FailureResponse {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export interface RegistrationResponse {
  jwt: string;
  user: User;
}

export interface UserProfileResponse {
  data: User | FilteredUserData | null;
  error: string | null;
}

export interface NavbarProps {
  isLoggedIn: boolean;
}

export type PricingData = {
  pricingPlansThree: any[];
  pricingPlansTwo: any[];
};

export interface Review {
  id: number;
  name: string;
  location: string;
  testimonial: string;
  img: {
    id: number;
    documentId: string;
    url: string;
  }[];
}

export interface CreateCheckoutSessionRequestBody {
  priceId: string;
  mode?: 'subscription' | 'payment';
}

export interface CreateCheckoutSessionResponse {
  client_secret: string;
}

export interface CreateCheckoutSessionErrorResponse {
  data: null;
  error: string;
}

export interface CheckoutSession {
  id: string;
  object: string;
  status: string | null;
  customer: string;
  customer_email: string;
  subscription: string;
}

// SubscriptionData is the transformed frontend data structure
export interface SubscriptionData {
  id?: number | string;
  plan_name: string;
  amount_of_cycles: number;
  amount_paid_cycles?: number;
  amount_paid?: number; // Decimal value for Strapi
  total_amount_to_pay: number; // Decimal value for Strapi
  amount_due?: number; // Decimal value for Strapi
  starting_date?: string;
  next_payment_date?: string;
  monthly_payment?: number; // Decimal value for Strapi
  session_id?: string;
  users_permissions_user: number;
  stripe_customer: number;
}

// FilteredUserData structure for frontend
export interface FilteredUserData {
  nombre: string;
  email: string;
  subscriptions: SubscriptionData[];
}

export interface FormData {
  userEmail: string;
  subject: string;
  message: string;
}

export interface PlanningSectionProps {
  mainHeading: string;
  description: string;
  highlightedText1: string; // "CERO PRONTO"
  highlightedText2: string; // "pagos mensuales"
  highlightedText3: string; // "Sin intereses"
  quotesImageSrc?: string;
  quotesImageAlt?: string;
  shieldImageSrc?: string;
  shieldImageAlt?: string;
  leftArrowImageSrc?: string;
  leftArrowImageAlt?: string;
  rightArrowImageSrc?: string;
  rightArrowImageAlt?: string;
}

export interface CTASectionProps {
  mainHeading: string;
  description: string;
  highlightedText: string; // For the strong/bold part of description
  buttonText: string;
  buttonLink?: string;
}

export interface ComparisonSectionProps {
  oneTimePrice: number;
  subscriptionPrice: number;
  currency: string;
  // Section 1 content
  section1: {
    heading: string;
    firstParagraph: string;
    secondParagraph: string;
    checklistItems: RichTextContent[];
    chartTitle: string;
    nfdaLinkText?: string;
    nfdaUrl?: string;
  };
  // Section 2 content
  section2: {
    heading: string;
    gridItems: Array<{
      title: string;
      description: string;
    }>;
    buttonText: string;
    buttonLink?: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  // Section 3 content
  section3: {
    heading: string;
    gridItems: Array<{
      title: string;
      description: string;
    }>;
    buttonText: string;
    buttonLink?: string;
    imageSrc?: string;
    imageAlt?: string;
    mobileImageSrc?: string;
    mobileImageAlt?: string;
  };
}

// Alternative interface for safer rich text handling
export interface RichTextContent {
  type: 'html' | 'markdown' | 'plain';
  content: string;
}

