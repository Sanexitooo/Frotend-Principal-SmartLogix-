import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  // 1. Estado para guardar lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });

  // 2. Estado para manejar el botón y el mensaje de éxito
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Función para actualizar los datos mientras el usuario teclea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al apretar el botón
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading'); // Cambia el botón a estado de carga

    // SIMULACIÓN DE ENVÍO AL BACKEND (1.5 segundos)
    // Cuando tengas un endpoint en el BFF para correos, reemplazarás esto con un fetch()
    setTimeout(() => {
      console.log("Datos enviados:", formData);
      setStatus('success'); // Mostramos el mensaje de éxito
      setFormData({ nombre: '', email: '', empresa: '', mensaje: '' }); // Limpiamos el formulario

      // Opcional: Ocultar el mensaje de éxito después de 5 segundos para que vuelva a la normalidad
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-24 bg-[#0a2e36] relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center px-6">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              {/* ... (Tus datos de contacto se mantienen intactos aquí) ... */}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-saas-orange/10"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Nombre completo</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Alonzo" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/40 focus:border-saas-orange transition-all text-sm font-bold text-saas-teal placeholder:text-slate-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Correo electrónico</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/40 focus:border-saas-orange transition-all text-sm font-bold text-saas-teal placeholder:text-slate-400" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Empresa / Organización</label>
                <input 
                  type="text" 
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Nombre de la empresa" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/40 focus:border-saas-orange transition-all text-sm font-bold text-saas-teal placeholder:text-slate-400" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest">Mensaje</label>
                <textarea 
                  rows={4} 
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu consulta aquí..." 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/40 focus:border-saas-orange transition-all text-sm font-bold text-saas-teal placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              {/* Botón dinámico que cambia según el estado */}
              <Button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-8 bg-[#0a414d] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold rounded-2xl transition-all shadow-lg group uppercase text-xs tracking-widest"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                {status !== 'loading' && <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </Button>

              {/* Mensaje de éxito renderizado condicionalmente */}
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 mt-4"
                >
                  <CheckCircle2 size={20} className="mr-2" />
                  <span className="font-bold text-sm">Mensaje Enviado con Exito</span>
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;