import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-saas-white overflow-hidden min-h-[90vh] flex items-center pt-20">
      {/* Background Decorators */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-saas-orange opacity-5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-saas-teal opacity-10 rounded-full blur-[100px]"></div>
      
      <div className="section-container relative z-10 text-center">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-block bg-saas-orange/10 text-saas-orange px-4 py-2 rounded-full text-sm font-medium mb-6 border border-saas-orange/20">
              SmartLogix - Soluciones de Gestión
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-saas-teal">
              Transportes <span className="text-saas-orange">Seguros</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-slate-600 max-w-2xl mx-auto">
              Optimiza tus operaciones, aumenta la productividad y mejora la satisfacción de tus clientes con nuestra plataforma de última generación.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-saas-orange hover:bg-[#e67700] text-white font-bold py-6 px-8 rounded-xl transition-all shadow-lg shadow-saas-orange/20">
                Empezar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="bg-white border-2 border-saas-teal text-saas-teal hover:bg-saas-teal hover:text-white py-6 px-8 rounded-xl font-bold transition-all duration-300 flex items-center shadow-sm"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Ver Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9U1CvvldfhYbQ1oWOFEosFwh8xpG3ft4ZJw&s" 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" 
                  alt="Client review 1" 
                />
                <img 
                  src="https://img.lahora.cl/upload/2026/02/17161D524C43466D15100F55504940791F121D18534146731514-1200x800.webp" 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" 
                  alt="Client review 2" 
                />
                <img 
                  src="https://media-front.elmostrador.cl/2022/05/124820758_pug1-210x210.jpg" 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" 
                  alt="Client review 3" 
                />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Más de <span className="font-bold text-saas-teal">500+</span> empresas confían en el servicio
              </p>
            </div>
          </div>
          
          {/* Main Visual */}
          <div className="mt-20 animate-fade-in transition-all duration-700 delay-300">
            <div className="relative max-w-5xl mx-auto px-4">
              <div className="relative bg-white rounded-2xl border border-slate-200 p-2 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1668597388138-9d1dae099182?q=80&w=1078&auto=format&fit=crop"
                  alt="Interface dashboard preview"
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;