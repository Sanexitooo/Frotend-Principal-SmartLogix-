import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react"; // Incluye iconos de expansión
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 

interface MensajeHistorial {
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); // Estado para controlar el tamaño expandido
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const saludoInicial = "¡Hola! Soy SmartBot, mucho gusto. 👋 ¿En qué puedo ayudarte con tu logística hoy?";
  
  const [historial, setHistorial] = useState<MensajeHistorial[]>([
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
      if (!apiKey) {
        throw new Error("API Key no configurada");
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", 
        systemInstruction: "Eres SmartBot, el asistente virtual inteligente de la plataforma SmartLogix. Tu objetivo es ayudar a los usuarios con la gestión logística, optimización de rutas y soporte del dashboard. Base de conocimientos obligatoria:\n1. Rutas: Reducimos costos de combustible en un 25% mediante algoritmos optimizados según el tráfico real.\n2. GPS: Monitoreo de flota en tiempo real integrado en el dashboard.\n3. Precios: Plan Basic ($20.000) and Plan Enterprise ($100.000).\n4. Integraciones: Shopify, Vtex y APIs personalizadas.\n5. Seguridad: Arquitectura basada en 'Privacy by Design' para proteger datos operativos.\n6. Soporte humano: Si el usuario pide hablar con un humano o un ejecutivo, dile que has escalado la solicitud y un experto se conectará en breve.\nResponde de forma concisa, profesional y usa emojis amigables. Si te preguntan cosas fuera de la logística o SmartLogix, amablemente vuelve a enfocar la conversación.",
      });

      // Filtra el saludo inicial y errores previos para no romper la secuencia del chat
      const historyToPass = historial
        .filter(m => m.text !== saludoInicial && !m.text.startsWith("⚠️ Error"))
        .map(m => ({
          role: m.isBot ? "model" : "user",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({
        history: historyToPass,
      });

      const result = await chat.sendMessage(mensajeUsuario);
      const respuestaBot = result.response.text();

      setHistorial(prev => [...prev, { text: respuestaBot, isBot: true }]);
    } catch (error: any) {
      console.error("Error con Gemini API:", error);
      setHistorial(prev => [...prev, { 
        text: `⚠️ Error de conexión: ${error.message || "Problema desconocido"}`, 
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
            <div className="bg-[#0f4c5c] p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ff7a00] rounded-full flex items-center justify-center border border-white/20">
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
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#ff7a00]/20 focus:border-[#ff7a00] outline-none transition-all text-slate-800 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!mensaje.trim() || isLoading}
                className="bg-[#ff7a00] text-white p-2.5 rounded-xl hover:bg-[#e66e00] transition-all active:scale-95 disabled:opacity-30"
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