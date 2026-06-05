import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import ChatBubble from "./ChatBubble";

const Chatbot = () => {
  const {
    isOpen, setIsOpen,
    isMaximized, setIsMaximized,
    mensaje, setMensaje,
    isLoading,
    historial,
    messagesEndRef,
    handleCerrar,
    handleEnviar,
  } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`mb-4 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
              isMaximized
                ? "w-[calc(100vw-3rem)] h-[calc(100vh-6rem)] md:w-[600px] md:h-[750px]"
                : "w-[350px] h-[500px]"
            }`}
          >
            <div className="bg-saas-tealChat p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-saas-orangeVivid rounded-full flex items-center justify-center border border-white/20">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight">SmartBot - SmartLogix</span>
              </div>
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

            <div className="flex-1 p-5 bg-saas-lightBg overflow-y-auto flex flex-col gap-4">
              {historial.map((m, i) => (
                <ChatBubble key={i} message={m} />
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

      <motion.button
        layout
        onClick={() => (isOpen ? handleCerrar() : setIsOpen(true))}
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
