import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
                alt="SmartLogix Team" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-saas-orange/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Lado Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-saas-orange font-bold uppercase text-xs tracking-[0.2em] mb-4 block">
              Nuestra Historia
            </span>
            <h2 className="text-4xl font-black text-saas-teal mb-6 leading-tight">
              Impulsando la logística <br />
              <span className="text-saas-orange italic">con tecnología de punta.</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
              SmartLogix nació como una solución integral para las PYMEs que buscan optimizar sus procesos de última milla. 
              Nos enfocamos en la eficiencia operativa y la seguridad de los datos, garantizando que cada entrega sea 
              monitoreada bajo los más altos estándares técnicos.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-saas-orange/10 rounded-xl flex items-center justify-center text-saas-orange">
                  <Shield size={20} />
                </div>
                <h4 className="font-bold text-saas-teal">Confianza</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Arquitectura basada en Privacy by Design para proteger tu información.</p>
              </div>
              
              <div className="space-y-3 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-saas-orange/10 rounded-xl flex items-center justify-center text-saas-orange">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-saas-teal">Velocidad</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Algoritmos de optimización que reducen tiempos de entrega en un 30%.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;