export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  color: string;
}

export interface Testimonial {
  text: string;
  author: string;
  position: string;
  image: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SiiCode {
  codigo: string;
  nombre: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface MensajeHistorial {
  text: string;
  isBot: boolean;
}

export type ToastActionElement = React.ReactElement;
