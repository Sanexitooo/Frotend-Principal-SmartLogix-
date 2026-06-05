import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="bg-saas-darkGray py-16 md:py-20">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-saas-orange/20 to-amber-600/20 rounded-2xl p-8 md:p-12 relative overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-saas-orange opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3 text-left">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                Agende su demostración gratuita de SmartLogix
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 mb-6 max-w-xl leading-relaxed"
              >
                Aclara todas tus dudas y descubre cómo nuestra plataforma potencia tu negocio. ¡Te aseguramos resultados sorprendentes!
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a href="#nosotros">
                  <Button 
                    className="bg-saas-orange hover:bg-orange-600 text-white font-bold py-6 px-10 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    Acerca de Nosotros
                  </Button>
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:w-1/3"
            >
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYMZdhczIzyQN5oSp3Whz_1iao2IMppulTg&s"
                alt="Alianza estratégica"
                className="rounded-xl w-full shadow-2xl object-cover opacity-90 border border-white/10"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;