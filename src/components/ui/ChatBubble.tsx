/*
 * ============================================
 * ChatBubble — Burbuja individual de mensaje
 * ============================================
 *
 * Componente presentacional: solo renderiza lo que recibe por props.
 * No tiene estado, no llama APIs, no tiene efectos.
 * Fácil de testear y reutilizar.
 *
 * Props:
 *   message: ChatMessage → { text: string, isBot: boolean }
 *
 * Comportamiento:
 *   - isBot=true  → alineado a la izquierda, estilo burbuja blanca
 *   - isBot=false → alineado a la derecha, estilo burbuja naranja
 *   - Animación de entrada con slide horizontal
 */

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/types/ai";

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isBot = message.isBot;
  return (
    <motion.div
      initial={{ opacity: 0, x: isBot ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-[1.2rem] text-[13px] leading-relaxed shadow-sm ${
          isBot
            ? "bg-white dark:bg-saas-lightBg text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
            : "bg-saas-orangeVivid text-white rounded-tr-none font-medium"
        }`}
      >
        {/* El div contenedor maneja los estilos para que TypeScript no reclame por las propiedades internas */}
        <div className="whitespace-pre-wrap list-disc list-inside">
          <ReactMarkdown>
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;