import { MouseEvent } from "react";

export interface NavbarProps {
  // Currently, there are no props. Add any future props here.
}

export type HandlePlanesClick = (e: MouseEvent<HTMLAnchorElement>) => void;

export interface ChartData {
  name: string;
  Costo: number;
}

// Define the return type for the useInView hook
export type UseInViewReturn = readonly [boolean, React.RefObject<HTMLElement>];

// src/types/index.ts

export type PricingPlanThree = {
  name: string;
  price: number;
  period: number; // Changed from string to number
  total: number;
  description: string;
  link: string;
  currency: string;
};

export type PricingPlanTwo = {
  name: string;
  price: number;
  discountPrice: number;
  savings: number;
  description: string;
  link: string;
  currency: string;
};

export interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  link: string;
  currency: string;
  isSubscription: boolean;
  featured: boolean | null;
  features: string[];
}
// Type Guard to differentiate between PricingPlanTwo and PricingPlanThree

export type Image = {
  id: number;
  documentId: string;
  url: string;
};

export type Urna = {
  id: number;
  documentId: string;
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  url: string;
};

// Define the props interface
export interface ComparisonSectionProps {
  oneTimePrice: number;
  subscriptionPrice: number;
  currency: string;
}

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type UrnasResponse = {
  data: Urna[];
  meta: {
    pagination: Pagination;
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


export interface StrapiErrorDetails {
  [key: string]: string | number | boolean | object | null;
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: StrapiErrorDetails;
}

export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

export interface RegisterFormErrors {
  general?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}


export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    email: string;
    // Add other user fields as needed
  };
}

export interface AuthError {
  error: {
    status: number;
    name: string;
    message: string;
  };
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
  stripe_customer?: StripeCustomer;
  nombre: string;
  subscriptions: SubscriptionData[];
  locale?: string | null;
}

export interface ErrorResponse {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
}

export interface SuccessResponse<T> {
  data: T | null;
  error: null;
}

export interface FailureResponse {
  data: null;
  error: ErrorResponse;
}

export interface RegistrationResponse {
  jwt: string;
  user: User;
}

export interface UserProfileResponse {
  data: User | FilteredUserData |null;
  error: string | null;
}

// Error handling for frontend
export interface FrontendError {
  general?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface NavbarProps {
  isLoggedIn: boolean;
}

export type PricingData = {
  pricingPlansThree: PricingPlanThree[];
  pricingPlansTwo: PricingPlanTwo[];
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

export type ReviewsResponse = {
  data: Review[];
  meta: {
    pagination: Pagination;
  };
};

export interface StripeCustomer {
  id: number;
  stripe_customer_id: string;
}

export interface CreateCheckoutSessionRequestBody {
  priceId: string;
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
  id: string;
  plan_name: string;
  amount_of_cycles: number;
  amount_paid_cycles: number;
  amount_paid: number; // Converted to number
  total_amount_to_pay: number; // Converted to number
  amount_due: number; // Converted to number
  starting_date: string;
  next_payment_date: string;
  monthly_payment: number; // Converted to number
  session_id: string;
  users_permissions_user: number;
  stripe_customer: number;
}

// FilteredUserData structure for frontend
export interface FilteredUserData {
  nombre: string;
  email: string;
  subscriptions: SubscriptionData[];
}


export interface PopupProps {
  full_price: number;
  discount_price: number;
  subscription_price: number;
  currency: string;
}

export interface FormData {
  userEmail: string;
  subject: string;
  message: string;
}

