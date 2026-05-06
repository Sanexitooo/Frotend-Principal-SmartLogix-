import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "Implementar SmartLogix cambió las reglas del juego para nuestro equipo. La interfaz es intuitiva y el monitoreo en tiempo real mejoró nuestra productividad significativamente.",
    author: "Krystian Reymond",
    position: "Gerente de Logística, Transportes Sur",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9U1CvvldfhYbQ1oWOFEosFwh8xpG3ft4ZJw&s"
  },
  {
    text: "El equipo de soporte de SmartLogix es excepcional. Han sido increíblemente receptivos y nos ayudaron a optimizar nuestro flujo de trabajo para sacar el máximo provecho.",
    author: "Fabian Cuevas",
    position: "Director de Operaciones, Logística Central",
    image: "https://img.lahora.cl/upload/2026/02/17161D524C43466D15100F55504940791F121D18534146731514-1200x800.webp"
  },
  {
    text: "Hemos probado varias plataformas antes, pero SmartLogix ofrece el equilibrio perfecto entre funcionalidad y facilidad de uso. Es esencial para nuestra operación diaria.",
    author: "Tomas Martinez",
    position: "Jefe de Flota, Manager",
    image: "https://media-front.elmostrador.cl/2022/05/124820758_pug1-210x210.jpg"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-saas-teal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saas-orange/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <span className="inline-block bg-saas-orange text-white px-4 py-1 rounded-lg text-sm font-bold mb-4 shadow-lg shadow-saas-orange/20">
              # Testimonios
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Empresas que <span className="text-saas-orange italic">Confían</span> en Nosotros
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={prev} 
              className="p-4 rounded-xl border-2 border-white/10 text-white hover:bg-saas-orange hover:border-saas-orange transition-all duration-300 group"
            >
              <ChevronLeft className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={next} 
              className="p-4 rounded-xl border-2 border-white/10 text-white hover:bg-saas-orange hover:border-saas-orange transition-all duration-300 group"
            >
              <ChevronRight className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[450px] md:min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-14 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-10"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-saas-orange blur-2xl opacity-20 rounded-full"></div>
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] object-cover border-4 border-saas-orange relative z-10 shadow-2xl"
                />
              </div>

              <div className="flex-1 text-left">
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-saas-orange text-saas-orange" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-100 font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="text-2xl font-black text-white">{testimonials[currentIndex].author}</h4>
                  <p className="text-saas-orange font-bold tracking-wide uppercase text-sm mt-1">
                    {testimonials[currentIndex].position}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "w-8 bg-saas-orange" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;