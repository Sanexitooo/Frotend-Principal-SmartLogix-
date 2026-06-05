import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { plans } from "@/data/plans";
import { useFadeInView, hoverLift } from "@/hooks/use-fade-in-view";
import type { Plan } from "@/types";

const PlanCard = ({ plan, index }: { plan: Plan; index: number }) => {
  const anim = useFadeInView({ delay: index * 0.15, y: 30, duration: 0.5 });
  return (
    <motion.div {...anim} {...hoverLift}
      className={`rounded-[2.5rem] p-8 bg-slate-950 flex flex-col h-full transition-all duration-300 shadow-xl hover:shadow-saas-orange/10 ${
        plan.isPopular ? 'scale-105 z-10' : 'scale-95'
      } ${plan.color}`}
    >
              {plan.isPopular && (
                <div className="bg-saas-orange text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-4 self-start tracking-widest">
                  Recomendado
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2 text-white tracking-tighter">{plan.name}</h3>
              <p className="text-slate-400 text-[11px] mb-6 h-8 font-medium leading-tight">{plan.description}</p>
              
              <div className="mb-8 text-white">
                <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase ml-1"> CLP</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-3.5 w-3.5 text-saas-orange mr-3 shrink-0" />
                    <span className="text-slate-300 text-[11px] font-bold">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-6 font-black rounded-xl uppercase text-[11px] tracking-widest transition-all ${
                  plan.isPopular 
                    ? 'bg-saas-orange hover:bg-orange-600 text-white shadow-lg shadow-saas-orange/20' 
                    : 'bg-white text-slate-950 hover:bg-slate-200'
                }`}
              >
                {plan.ctaText}
              </Button>
            </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section id="tarifas" className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="section-container relative">
        <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-saas-teal leading-none">
            Nuestros <span className="text-saas-orange">Planes</span>
          </h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Tarifas transparentes diseñadas para escalar junto a tu flota.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-stretch px-4 max-w-6xl mx-auto">
          {plans.map((plan: Plan, index: number) => (
            <PlanCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;