/*
 * ============================================
 * useChat — Hook de lógica del chatbot
 * ============================================
 *
 * Separa TODA la lógica de estado (historial, loading, envío) del
 * componente de UI (chatbot.tsx). El componente solo se preocupa de
 * renderizar, el hook se preocupa de los datos.
 *
 * Principio de Inversión de Dependencias:
 *   El hook usa IChatService. La implementación concreta se importa
 *   aquí. Para cambiar de proveedor de IA, cambia UNA línea:
 *
 *     import { chatService } from "@/services/openrouter-chat.service";
 *     → import { chatService } from "@/services/gemini-chat.service";
 *
 * Retorna todo lo necesario para que el componente sea puramente declarativo.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { chatService } from "@/services/openrouter-chat.service";
// Para usar Gemini en vez de OpenRouter, cambiar a:
// import { chatService } from "@/services/gemini-chat.service";
import type { ChatMessage } from "@/types/ai";

/** Mensaje de bienvenida que el bot muestra al abrir el chat */
const SALUDO_INICIAL =
  "¡Hola! Soy SmartBot, mucho gusto. 👋 ¿En qué puedo ayudarte con tu logística hoy?";

export function useChat() {
  /* --- Estado del widget --- */
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* --- Historial de la conversación --- */
  const [historial, setHistorial] = useState<ChatMessage[]>([
    { text: SALUDO_INICIAL, isBot: true },
  ]);

  /* --- Auto-scroll al último mensaje --- */
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial, isLoading]);

  /* --- Cerrar el chat y resetear el historial --- */
  const handleCerrar = useCallback(() => {
    setIsOpen(false);
    setIsMaximized(false);
    setHistorial([{ text: SALUDO_INICIAL, isBot: true }]);
  }, []);

  /* --- Enviar mensaje al servicio de IA --- */
  const handleEnviar = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!mensaje.trim() || isLoading) return;

      // Agrega el mensaje del usuario al historial
      const mensajeUsuario = mensaje;
      setHistorial((prev) => [...prev, { text: mensajeUsuario, isBot: false }]);
      setMensaje("");
      setIsLoading(true);

      try {
        // No envía el saludo inicial como contexto (solo confunde al modelo)
        const filteredHistory = historial.filter(
          (m) => m.text !== SALUDO_INICIAL
        );
        const respuestaBot = await chatService.sendMessage(
          mensajeUsuario,
          filteredHistory
        );
        setHistorial((prev) => [...prev, { text: respuestaBot, isBot: true }]);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Problema desconocido";
        console.error("Error con servicio de chat:", error);
        setHistorial((prev) => [
          ...prev,
          { text: `⚠️ Error de conexión: ${message}`, isBot: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [mensaje, isLoading, historial]
  );

  return {
    isOpen,
    setIsOpen,
    isMaximized,
    setIsMaximized,
    mensaje,
    setMensaje,
    isLoading,
    historial,
    messagesEndRef,
    handleCerrar,
    handleEnviar,
  };
}
