import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const PricingSection = () => {
  // Mantenemos el toggle, pero ahora los precios serán CLP fijos según tus fotos
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Plan Basic',
      price: '20.000',
      description: 'Pensado para PYMEs pequeñas que recién digitalizan su logística',
      features: [
        'Gestión básica de inventario',
        'Registro manual de pedidos',
        'Optimización de rutas simple (hasta 10 entregas/día)',
        'Visualización de rutas en mapa',
        '1 usuario administrador',
        'Soporte básico (email)'
      ],
      isPopular: false,
      ctaText: 'Comenzar con Basic',
      color: 'border-green-500/30'
    },
    {
      name: 'Plan E-Commerce',
      price: '45.000',
      description: 'Para PYMEs en crecimiento con ventas online',
      features: [
        'Todo lo del Plan Basic +',
        'Integración con tiendas eCommerce',
        'Gestión automática de pedidos',
        'Optimización de rutas avanzada (hasta 100 entregas/día)',
        'Priorización de pedidos',
        'Dashboard logístico completo',
        'Múltiples usuarios (hasta 5)',
        'Soporte prioritario'
      ],
      isPopular: true,
      ctaText: 'Probar E-Commerce',
      color: 'border-blue-500/30'
    },
    {
      name: 'Plan Enterprise',
      price: '100.000',
      description: 'Para empresas con alta demanda y necesidad de escalabilidad',
      features: [
        'Todo lo del Plan E-Commerce +',
        'Optimización de rutas masiva',
        'Gestión multi-bodega',
        'Sistema de notificaciones (clientes/repartidores)',
        'Análisis avanzado (KPIs logísticos)',
        'Control de roles (admin, operador, repartidor)',
        'Alta disponibilidad',
        'Soporte dedicado'
      ],
      isPopular: false,
      ctaText: 'Contactar Enterprise',
      color: 'border-purple-500/30'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-saas-darkGray to-saas-black py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Precios <span className="text-saas-orange">Simples y Transparentes</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Elige el plan que mejor se adapte a tu logística. Sin costos ocultos ni sorpresas.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${isAnnual ? 'text-saas-orange' : 'text-gray-400'}`}>Anual</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-600 transition-colors"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${!isAnnual ? 'text-saas-orange' : 'text-gray-400'}`}>Mensual</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-8 border ${plan.color} bg-slate-900/40 transition-all duration-300 hover:-translate-y-2 ${
                plan.isPopular ? 'ring-2 ring-saas-orange shadow-lg shadow-saas-orange/10' : ''
              }`}
            >
              {plan.isPopular && (
                <span className="bg-saas-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  Más Recomendado
                </span>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-6 text-white">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 text-sm"> CLP/mes</span>
              </div>
              
              <ul className="space-y-4 mb-8 min-h-[300px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-saas-orange mr-2 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-6 font-bold ${
                  plan.isPopular 
                    ? 'bg-saas-orange hover:bg-orange-600 text-white' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
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