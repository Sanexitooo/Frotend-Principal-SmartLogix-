import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de SmartLogix. ¿En qué puedo ayudarte con tu flota hoy?", isBot: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    
    const userMessage = message.toLowerCase();
    const newMessages = [...messages, { text: message, isBot: false }];
    setMessages(newMessages);
    setMessage("");

    setTimeout(() => {
      let botResponse = "Entiendo. Un ejecutivo de SmartLogix revisará tu consulta a la brevedad.";
      
      if (userMessage.includes("hola") || userMessage.includes("buena")) {
        botResponse = "¡Hola! Un gusto saludarte. ¿Necesitas información sobre nuestras rutas, tarifas o estado de flota?";
      } else if (userMessage.includes("precio") || userMessage.includes("tarifa") || userMessage.includes("cuanto cuesta")) {
        botResponse = "Nuestros planes comienzan desde los $29.990 mensuales. Puedes ver el detalle en la sección de Tarifas.";
      } else if (userMessage.includes("ruta") || userMessage.includes("mapa") || userMessage.includes("donde estan")) {
        botResponse = "Actualmente operamos en toda la Región Metropolitana y Valparaíso. Puedes monitorear las rutas en tiempo real desde el dashboard.";
      } else if (userMessage.includes("flota") || userMessage.includes("estado") || userMessage.includes("camion")) {
        botResponse = "El sistema reporta que el 95% de la flota está operativa. Puedes revisar el estado de cada unidad ingresando a tu panel de control.";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col mb-4"
          >
            <div className="bg-saas-teal p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg">SmartBot</h3>
                <p className="text-xs opacity-80">Soporte Logístico 24/7</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 p-6 bg-slate-50 overflow-y-auto space-y-4 flex flex-col">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                    msg.isBot 
                      ? "bg-white border border-slate-100 text-saas-teal self-start rounded-tl-none" 
                      : "bg-saas-orange text-white self-end rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Escribe tu duda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-slate-50 border border-slate-200 p-3 pr-12 rounded-xl text-sm text-slate-900 outline-none focus:border-saas-orange transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-2 text-saas-orange hover:scale-110 transition-transform"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-saas-orange text-white p-4 rounded-full shadow-xl shadow-saas-orange/30 flex items-center justify-center relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-8 w-8" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-8 w-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Chatbot;