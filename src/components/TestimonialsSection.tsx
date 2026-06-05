import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Testimonial } from "@/types";

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonialsList = testimonials as Testimonial[];

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
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saas-orange/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      
      <div className="section-container relative z-10 text-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div className="max-w-2xl">
            <span className="inline-block bg-saas-orange text-white px-4 py-1 rounded-lg text-sm font-bold mb-4 shadow-lg shadow-saas-orange/20 uppercase tracking-widest">
              Testimonios
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-14 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-10"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-saas-orange blur-2xl opacity-20 rounded-full"></div>
                 <img
                  src={testimonialsList[currentIndex].image}
                  alt={testimonialsList[currentIndex].author}
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
                  "{testimonialsList[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="text-2xl font-black text-white">{testimonialsList[currentIndex].author}</h4>
                  <p className="text-saas-orange font-bold tracking-wide uppercase text-sm mt-1">
                    {testimonialsList[currentIndex].position}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-10">
            {testimonialsList.map((_, i) => (
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