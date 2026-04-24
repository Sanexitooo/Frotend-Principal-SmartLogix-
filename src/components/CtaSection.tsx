import React from 'react';
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <div className="bg-saas-darkGray py-16 md:py-20">
      <div className="section-container">
        <div className="bg-gradient-to-r from-saas-orange/20 to-amber-600/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Abstract glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-saas-orange opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600 opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para transformar tu logística?
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                Únete a las cientos de empresas que ya están optimizando sus operaciones y haciendo crecer su flota con SmartLogix. Comienza tu prueba gratuita hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-saas-orange hover:bg-orange-600 text-white font-semibold">
                  Comenzar Prueba Gratis
                </Button>
                <Button variant="outline" className="border-background text-white hover:bg-white hover:text-saas-black hover:border-white">
                  Agendar Demo
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYMZdhczIzyQN5oSp3Whz_1iao2IMppulTg&s"
                alt="Logística SmartLogix"
                className="rounded-lg w-full card-shadow object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;