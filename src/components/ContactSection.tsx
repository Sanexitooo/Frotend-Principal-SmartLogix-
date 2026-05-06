import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  // Manejo básico de envío de formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de integración futura con backend
  };

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Section Heading & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-saas-orange font-bold uppercase text-xs tracking-widest mb-4 block">
              Canales de comunicación
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-saas-teal mb-6 leading-tight">
              ¿Tienes dudas? <br />
              <span className="text-saas-orange italic">Hablemos hoy mismo.</span>
            </h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
              Nuestro equipo está disponible para ayudarte a optimizar tu operación logística. 
              Escríbenos y nos pondremos en contacto contigo a la brevedad.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-saas-orange/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Consultas Generales</p>
                  <p className="text-saas-teal font-bold text-lg">contacto@smartlogix.cl</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-saas-orange/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Soporte Comercial</p>
                  <p className="text-saas-teal font-bold text-lg">+56 9 1234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-saas-orange/10 rounded-2xl flex items-center justify-center text-saas-orange group-hover:bg-saas-orange group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sede Central</p>
                  <p className="text-saas-teal font-bold text-lg">Antonio Varas 666, Providencia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Nombre completo</label>
                  <input type="text" placeholder="Ej: Alonzo" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/20 focus:border-saas-orange transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@correo.com" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/20 focus:border-saas-orange transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Empresa / Organización</label>
                <input type="text" placeholder="Nombre de la empresa" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/20 focus:border-saas-orange transition-all text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Mensaje</label>
                <textarea rows={4} placeholder="Escribe tu consulta aquí..." className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/20 focus:border-saas-orange transition-all text-sm resize-none"></textarea>
              </div>

              <Button className="w-full py-8 bg-saas-teal hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg group uppercase text-xs tracking-widest">
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