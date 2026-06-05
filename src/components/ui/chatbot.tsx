import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { chatService } from "@/services/gemini-chat.service";
import type { ChatMessage } from "@/types/ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const saludoInicial = "¡Hola! Soy SmartBot, mucho gusto. 👋 ¿En qué puedo ayudarte con tu logística hoy?";
  
  const [historial, setHistorial] = useState<ChatMessage[]>([
    { text: saludoInicial, isBot: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial, isLoading]);

  const handleCerrar = () => {
    setIsOpen(false);
    setIsMaximized(false); // Resetea el tamaño al cerrar
    setHistorial([{ text: saludoInicial, isBot: true }]); // Limpia el historial al cerrar
  };

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim() || isLoading) return;

    const mensajeUsuario = mensaje;
    setHistorial(prev => [...prev, { text: mensajeUsuario, isBot: false }]);
    setMensaje("");
    setIsLoading(true);

    try {
      const filteredHistory = historial.filter(m => m.text !== saludoInicial);
      const respuestaBot = await chatService.sendMessage(mensajeUsuario, filteredHistory);

      setHistorial(prev => [...prev, { text: respuestaBot, isBot: true }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Problema desconocido";
      console.error("Error con Gemini API:", error);
      setHistorial(prev => [...prev, {
        text: `⚠️ Error de conexión: ${message}`,
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            // Clases dinámicas para manejar el tamaño responsivo cuando se maximiza
            className={`mb-4 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
              isMaximized 
                ? "w-[calc(100vw-3rem)] h-[calc(100vh-6rem)] md:w-[600px] md:h-[750px]" 
                : "w-[350px] h-[500px]"
            }`}
          >
            {/* Barra superior */}
            <div className="bg-saas-tealChat p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-saas-orangeVivid rounded-full flex items-center justify-center border border-white/20">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight">SmartBot - SmartLogix</span>
              </div>
              
              {/* Contenedor de botones (Expandir y Cerrar) */}
              <div className="flex items-center gap-1">
                <button 
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)} 
                  className="hover:bg-white/10 p-1.5 rounded-lg transition-colors text-white/80 hover:text-white"
                  title={isMaximized ? "Minimizar" : "Maximizar"}
                >
                  {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                <button type="button" onClick={handleCerrar} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 p-5 bg-saas-lightBg overflow-y-auto flex flex-col gap-4">
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
                    : 'bg-saas-orangeVivid text-white rounded-tr-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 px-4 py-3 rounded-[1.2rem] rounded-tl-none text-[13px] border border-slate-100 italic animate-pulse">
                    SmartBot está pensando...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de texto */}
            <form onSubmit={handleEnviar} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input 
                type="text" 
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={isLoading ? "Esperando respuesta..." : "Escribe a SmartBot..."}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-saas-orangeVivid/20 focus:border-saas-orangeVivid outline-none transition-all text-slate-800 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!mensaje.trim() || isLoading}
                className="bg-saas-orangeVivid text-white p-2.5 rounded-xl hover:bg-saas-orangeHover transition-all active:scale-95 disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante para abrir/cerrar */}
      <motion.button
        layout
        onClick={() => {
          if (isOpen) {
            handleCerrar();
          } else {
            setIsOpen(true);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className={`${isOpen ? "bg-slate-800" : "bg-saas-orangeVivid"} text-white p-4 rounded-full shadow-2xl transition-colors duration-300`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={28} /> : <MessageCircle key="m" size={28} />}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;