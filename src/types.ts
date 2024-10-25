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
  username: string;
  password: string;
  confirmPassword: string;
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

// Define types for the request and response
export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
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
  data: User | null;
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
