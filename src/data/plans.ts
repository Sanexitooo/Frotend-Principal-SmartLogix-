export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  color: string;
}

export const plans: Plan[] = [
  {
    name: "Plan Basic",
    price: "20.000",
    description: "Ideal para digitalizar tus primeras rutas operativas.",
    features: [
      "Gestión de inventario",
      "Registro de pedidos",
      "Optimización simple",
      "Mapa en tiempo real",
      "1 usuario admin",
      "Soporte estándar",
    ],
    isPopular: false,
    ctaText: "Comenzar ahora",
    color: "border-amber-900 border-4",
  },
  {
    name: "Plan E-Commerce",
    price: "45.000",
    description: "Nuestra solución equilibrada para el crecimiento.",
    features: [
      "Todo lo del Plan Basic +",
      "Integración eCommerce",
      "Gestión automática",
      "Optimización avanzada",
      "Dashboard completo",
      "Hasta 5 usuarios",
      "Soporte prioritario",
    ],
    isPopular: true,
    ctaText: "Probar E-Commerce",
    color: "border-saas-orange border-4 shadow-2xl shadow-saas-orange/20",
  },
  {
    name: "Plan Enterprise",
    price: "100.000",
    description: "Potencia máxima para alta demanda.",
    features: [
      "Todo lo del Plan E-Commerce +",
      "Optimización masiva",
      "Gestión multi-bodega",
      "Notificaciones push",
      "Análisis de KPIs",
      "Control de roles",
      "Soporte 24/7",
    ],
    isPopular: false,
    ctaText: "Contactar Ventas",
    color: "border-slate-800",
  },
];
