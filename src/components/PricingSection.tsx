import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Básico',
      monthlyPrice: 19,
      annualPrice: 15,
      description: 'Perfecto para pequeñas empresas y transportistas independientes',
      features: [
        'Hasta 5 vehículos',
        'Seguimiento GPS básico',
        'Planificación de rutas',
        'Soporte vía email',
        '1 administrador'
      ],
      isPopular: false,
      ctaText: 'Comenzar con Básico'
    },
    {
      name: 'Profesional',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'Ideal para empresas en crecimiento y flotas medianas',
      features: [
        'Hasta 20 vehículos',
        'Análisis de combustible',
        'Gestión de conductores',
        'Soporte prioritario',
        'Reportes mensuales',
        'Acceso API básica',
        'Integración con sensores'
      ],
      isPopular: true,
      ctaText: 'Probar Profesional'
    },
    {
      name: 'Corporativo',
      monthlyPrice: 99,
      annualPrice: 79,
      description: 'Para grandes organizaciones con necesidades complejas',
      features: [
        'Vehículos ilimitados',
        'Análisis con IA',
        'Soporte 24/7 dedicado',
        'Proyectos ilimitados',
        'Acceso total a la API',
        'Integración personalizada',
        'Autenticación SSO',
        'Gerente de cuenta dedicado'
      ],
      isPopular: false,
      ctaText: 'Contactar Ventas'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-saas-darkGray to-saas-black py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Precios <span className="gradient-text">Simples y Transparentes</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Elige el plan que mejor se adapte a tu logística. Sin costos ocultos ni sorpresas.
          </p>
          
          {/* Pricing toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${isAnnual ? 'text-saas-orange' : 'text-gray-400'}`}>
              Anual <span className="text-xs text-saas-orange">(Ahorra 20%)</span>
            </span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${isAnnual ? 'bg-saas-orange' : 'bg-gray-600'}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm font-medium ${!isAnnual ? 'text-saas-orange' : 'text-gray-400'}`}>
              Mensual
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-saas-orange/20 to-saas-black border border-saas-orange/30 transform hover:-translate-y-2' 
                  : 'bg-saas-darkGray border border-gray-800 transform hover:-translate-y-1'
              }`}
            >
              {plan.isPopular && (
                <span className="bg-saas-orange text-saas-black text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  Más Popular
                </span>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-400"> /mes</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-saas-orange mr-2 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.isPopular 
                    ? 'bg-saas-orange hover:bg-orange-600 text-white' 
                    : 'bg-secondary border border-saas-orange/30 hover:border-saas-orange text-white'
                }`}
              >
                {plan.ctaText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;