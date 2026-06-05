import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';
import { useFadeInView, hoverLift } from '@/hooks/use-fade-in-view';
import { imgOnError } from "@/lib/img";

const AboutSection = () => {
  const imageAnim = useFadeInView({ y: 30 });
  const textAnim = useFadeInView({ x: 30 });
  return (
    <section id="nosotros" className="py-24 bg-slate-50 dark:bg-saas-darkGray overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...imageAnim} {...hoverLift} className="relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
                alt="SmartLogix Team"
                className="w-full h-[500px] object-cover"
                onError={imgOnError}
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-saas-orange/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div {...textAnim}>
            <span className="text-saas-orange font-black uppercase text-[11px] tracking-[0.4em] mb-4 block">
              Nuestra Historia
            </span>
            <h2 className="text-4xl font-black text-saas-teal mb-6 leading-tight">
              Impulsando la logística <br />
              <span className="text-saas-orange italic">con tecnología de punta.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
              SmartLogix nació como una solución integral para las PYMEs que buscan optimizar sus procesos de última milla.
              Nos enfocamos en la eficiencia operativa y la seguridad de los datos, garantizando que cada entrega sea
              monitoreada bajo los más altos estándares técnicos.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <motion.div {...hoverLift} className="space-y-3 p-6 bg-white dark:bg-saas-lightBg rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-saas-orange/10 rounded-xl flex items-center justify-center text-saas-orange">
                  <Shield size={20} />
                </div>
                <h4 className="font-bold text-saas-teal">Confianza</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Arquitectura basada en Privacy by Design para proteger tu información.</p>
              </motion.div>
              
              <motion.div {...hoverLift} className="space-y-3 p-6 bg-white dark:bg-saas-lightBg rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-saas-orange/10 rounded-xl flex items-center justify-center text-saas-orange">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-saas-teal">Velocidad</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Algoritmos de optimización que reducen tiempos de entrega en un 30%.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;