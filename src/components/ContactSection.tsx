import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/FormField";
import { FormTextarea } from "@/components/shared/FormTextarea";
import { useFadeInView, hoverLift } from '@/hooks/use-fade-in-view';

const ContactSection = () => {
  const leftAnim = useFadeInView({ x: -30 });
  const rightAnim = useFadeInView({ delay: 0.2, y: 30, duration: 0.5 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contacto" className="py-24 bg-saas-tealDark relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center px-6">
          
          <motion.div {...leftAnim}>
            <span className="text-saas-orange font-bold uppercase text-xs tracking-widest mb-4 block">
              Canales de comunicación
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              ¿Tienes dudas? <br />
              <span className="text-saas-orange italic">Hablemos hoy mismo.</span>
            </h2>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
              Nuestro equipo está disponible para ayudarte a optimizar tu operación logística. 
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Consultas Generales</p>
                  <p className="text-white font-bold text-lg">contacto@smartlogix.cl</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Soporte Comercial</p>
                  <p className="text-white font-bold text-lg">+56 9 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sede Central</p>
                  <p className="text-white font-bold text-lg">Antonio Varas 666, Providencia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...rightAnim} {...hoverLift}
            className="bg-white dark:bg-saas-lightBg p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 dark:border-slate-700 transition-all duration-300 hover:shadow-saas-orange/10"
          >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Nombre completo"
                    name="nombre"
                    placeholder="Ej: Alonzo"
                    className="px-5 py-4 bg-slate-50 dark:bg-saas-darkGray border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-saas-orange/40 focus:border-saas-orange text-sm font-bold text-saas-teal placeholder:text-slate-400"
                    required
                  />
                  <FormField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="px-5 py-4 bg-slate-50 dark:bg-saas-darkGray border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-saas-orange/40 focus:border-saas-orange text-sm font-bold text-saas-teal placeholder:text-slate-400"
                    required
                  />
                </div>

                <FormField
                  label="Empresa / Organización"
                  name="empresa"
                  placeholder="Nombre de la empresa"
                  className="px-5 py-4 bg-slate-50 dark:bg-saas-darkGray border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-saas-orange/40 focus:border-saas-orange text-sm font-bold text-saas-teal placeholder:text-slate-400"
                  required
                />

                <FormTextarea label="Mensaje" name="mensaje" rows={4} placeholder="Escribe tu consulta aquí..." />

              <Button className="w-full py-8 bg-saas-tealMid hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg group uppercase text-xs tracking-widest">
                Enviar mensaje
                <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;