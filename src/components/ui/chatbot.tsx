import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([
    { text: "¡Hola! Soy SmartBot, mucho gusto. 👋 ¿En qué puedo ayudarte con tu logística hoy?", isBot: true }
  ]);

  const obtenerRespuestaBot = (input: string) => {
    const min = input.toLowerCase().trim();
    
    // Saludos
    if (/h+o+l+a+|buena+s+|holi|hey/.test(min)) {
      return "¡Hola! Soy SmartBot, mucho gusto. ¿Te gustaría optimizar tus rutas, consultar nuestras tarifas o saber más sobre seguridad?";
    }
    
    // Rutas
    if (min.includes("ruta") || min.includes("recorrido") || min.includes("optimizacion") || min.includes("mapa")) {
      return "SmartBot te informa: Nuestros algoritmos reducen costos de combustible en un 25% optimizando cada entrega según el tráfico real.";
    }

    // Seguimiento
    if (min.includes("rastreo") || min.includes("donde esta") || min.includes("gps") || min.includes("flota")) {
      return "Puedes monitorear toda tu flota en tiempo real con nuestro sistema GPS integrado directamente en el dashboard.";
    }

    // Precios
    if (min.includes("precio") || min.includes("cuanto cuesta") || min.includes("tarifas") || min.includes("valor") || min.includes("plan")) {
      return "Contamos con planes desde $20.000 (Basic) hasta $100.000 (Enterprise). ¿Quieres que te ayude a elegir el ideal para tu empresa?";
    }

    // Tecnología
    if (min.includes("api") || min.includes("integrar") || min.includes("shopify") || min.includes("ecommerce")) {
      return "¡Claro! SmartBot puede confirmarte que nos integramos con Shopify, Vtex y APIs personalizadas sin problemas.";
    }

    // Seguridad
    if (min.includes("seguro") || min.includes("seguridad") || min.includes("datos") || min.includes("privacidad")) {
      return "La seguridad es mi prioridad. Implementamos 'Privacy by Design' para blindar toda la información de tus operaciones.";
    }

    // Despedidas
    if (min.includes("gracias") || min.includes("chao") || min.includes("adios") || min.includes("nos vemos")) {
      return "¡De nada! Fue un placer ayudarte. SmartBot estará aquí si necesitas algo más. ¡Éxito en tus entregas!";
    }
    
    return "Recibimos tu mensaje. Un ejecutivo experto se pondrá en contacto contigo pronto para ver el tema: '" + input + "'.";
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const mensajeUsuario = mensaje;
    setHistorial(prev => [...prev, { text: mensajeUsuario, isBot: false }]);
    setMensaje("");

    setTimeout(() => {
      const respuesta = obtenerRespuestaBot(mensajeUsuario);
      setHistorial(prev => [...prev, { text: respuesta, isBot: true }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header con nombre actualizado */}
            <div className="bg-[#0f4c5c] p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-saas-orange rounded-full flex items-center justify-center border border-white/20">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight">SmartBot - SmartLogix</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 bg-[#f8fafc] overflow-y-auto flex flex-col gap-4">
              {historial.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-[1.2rem] text-[13px] leading-relaxed shadow-sm ${
                    m.isBot 
                    ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                    : 'bg-[#ff7a00] text-white rounded-tr-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleEnviar} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe a SmartBot..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#ff7a00]/20 focus:border-[#ff7a00] outline-none transition-all text-slate-800"
              />
              <button 
                type="submit"
                disabled={!mensaje.trim()}
                className="bg-[#ff7a00] text-white p-2.5 rounded-xl hover:bg-[#e66e00] transition-all active:scale-95 disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className={`${isOpen ? "bg-slate-800" : "bg-[#ff7a00]"} text-white p-4 rounded-full shadow-2xl transition-colors duration-300`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={28} /> : <MessageCircle key="m" size={28} />}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;