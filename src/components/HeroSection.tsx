import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenLogin: () => void;
}

const HeroSection = ({ onOpenLogin }: HeroProps) => {
  return (
    <section className="relative bg-white overflow-hidden min-h-[90vh] flex items-center pt-20">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-saas-orange opacity-5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-saas-teal opacity-10 rounded-full blur-[100px]"></div>
      
      <div className="section-container relative z-10 w-full text-center">
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block bg-saas-orange/10 text-saas-orange px-4 py-2 rounded-full text-sm font-bold mb-6 border border-saas-orange/20">
              SmartLogix - Soluciones de Gestión
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-saas-teal leading-[0.9]">
              Transportes <span className="text-saas-orange">Seguros</span><br/>
              e Inteligentes.
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-slate-600 max-w-2xl mx-auto font-medium">
              Optimiza tus operaciones, aumenta la productividad y mejora la satisfacción de tus clientes con nuestra plataforma de última generación.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={onOpenLogin}
                className="bg-saas-orange hover:bg-[#e67700] text-white font-black py-8 px-12 rounded-2xl transition-all shadow-2xl shadow-saas-orange/30 text-xl active:scale-95 group"
              >
                Empezar Gratis
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-4">
              <div className="flex -space-x-4">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9U1CvvldfhYbQ1oWOFEosFwh8xpG3ft4ZJw&s" className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover" alt="U1" />
                <img src="https://img.lahora.cl/upload/2026/02/17161D524C43466D15100F55504940791F121D18534146731514-1200x800.webp" className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover" alt="U2" />
                <img src="https://media-front.elmostrador.cl/2022/05/124820758_pug1-210x210.jpg" className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover" alt="U3" />
              </div>
              <p className="text-sm text-slate-500 font-bold max-w-xs text-left leading-tight">
                Más de <span className="text-saas-teal font-black">500+</span> empresas líderes confían en nuestra gestión.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative w-full max-w-5xl"
          >
            <div className="absolute -inset-10 bg-saas-orange/10 rounded-[4rem] blur-3xl" />
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white rounded-[2rem] border border-slate-200 p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1668597388138-9d1dae099182?q=80&w=1078&auto=format&fit=crop"
                alt="Interface dashboard preview"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-saas-teal/90 backdrop-blur-sm px-8 py-4 rounded-2xl text-white text-sm font-black shadow-2xl z-20 border border-white/10">
                SISTEMA DE CONTROL 
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;