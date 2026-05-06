import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Plan Basic',
      price: '20.000',
      description: 'Ideal para digitalizar tus primeras rutas operativas.',
      features: ['Gestión de inventario', 'Registro de pedidos', 'Optimización simple', 'Mapa en tiempo real', '1 usuario admin', 'Soporte estándar'],
      isPopular: false,
      ctaText: 'Comenzar ahora',
      color: 'border-slate-700/50 hover:border-slate-400'
    },
    {
      name: 'Plan E-Commerce',
      price: '45.000',
      description: 'Nuestra solución más equilibrada para el crecimiento.',
      features: ['Todo lo del Plan Basic +', 'Integración eCommerce', 'Gestión automática', 'Optimización avanzada', 'Dashboard completo', 'Hasta 5 usuarios', 'Soporte prioritario'],
      isPopular: true,
      ctaText: 'Probar E-Commerce',
      color: 'border-saas-orange/60 shadow-2xl shadow-saas-orange/10'
    },
    {
      name: 'Plan Enterprise',
      price: '100.000',
      description: 'Potencia máxima para operaciones de alta demanda.',
      features: ['Todo lo del Plan E-Commerce +', 'Optimización masiva', 'Gestión multi-bodega', 'Notificaciones push', 'Análisis de KPIs', 'Control de roles', 'Soporte 24/7'],
      isPopular: false,
      ctaText: 'Contactar Ventas',
      color: 'border-saas-teal/50 hover:border-saas-teal'
    }
  ];

  return (
    <section id="tarifas" className="bg-gradient-to-b from-saas-darkGray to-saas-black py-16 md:py-24 overflow-hidden">
      <div className="section-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Nuestros <span className="text-saas-orange">Planes</span>
          </h2>
          <p className="text-slate-400 mb-8 font-medium">Tarifas transparentes diseñadas para escalar junto a tu flota.</p>
          
          <div className="flex items-center justify-center space-x-6">
            <span className={`text-xs font-black tracking-widest uppercase transition-colors ${isAnnual ? 'text-saas-orange' : 'text-slate-500'}`}>Anual</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-slate-800 border border-white/10"
            >
              <motion.span 
                animate={{ x: isAnnual ? 36 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-block h-6 w-6 rounded-full bg-saas-orange shadow-lg" 
              />
            </button>
            <span className={`text-xs font-black tracking-widest uppercase transition-colors ${!isAnnual ? 'text-saas-orange' : 'text-slate-500'}`}>Mensual</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-[2.5rem] p-10 border ${plan.color} bg-white/[0.03] backdrop-blur-md flex flex-col h-full transition-colors duration-300 ${
                plan.isPopular ? 'bg-white/[0.08] scale-105 z-10' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="bg-saas-orange text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-6 self-start tracking-widest">
                  Recomendado
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2 text-white">{plan.name}</h3>
              <p className="text-slate-400 text-xs mb-8 h-10">{plan.description}</p>
              
              <div className="mb-10 text-white">
                <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                <span className="text-slate-500 text-xs font-bold uppercase ml-2"> CLP</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-3 w-3 text-saas-orange mr-4 shrink-0" />
                    <span className="text-slate-300 text-xs font-semibold">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-8 font-black rounded-2xl uppercase text-[10px] tracking-widest ${
                  plan.isPopular 
                    ? 'bg-saas-orange hover:bg-orange-600 text-white shadow-lg shadow-saas-orange/20' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {plan.ctaText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;