import { useState, useRef, useEffect, useCallback } from "react";
import { chatService } from "@/services/openrouter-chat.service";
// Para usar Gemini en vez de OpenRouter, cambiar a:
// import { chatService } from "@/services/gemini-chat.service";
import type { ChatMessage } from "@/types/ai";

const SALUDO_INICIAL = "¡Hola! Soy SmartBot, mucho gusto. 👋 ¿En qué puedo ayudarte con tu logística hoy?";

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historial, setHistorial] = useState<ChatMessage[]>([
    { text: SALUDO_INICIAL, isBot: true },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial, isLoading]);

  const handleCerrar = useCallback(() => {
    setIsOpen(false);
    setIsMaximized(false);
    setHistorial([{ text: SALUDO_INICIAL, isBot: true }]);
  }, []);

  const handleEnviar = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!mensaje.trim() || isLoading) return;

      const mensajeUsuario = mensaje;
      setHistorial((prev) => [...prev, { text: mensajeUsuario, isBot: false }]);
      setMensaje("");
      setIsLoading(true);

      try {
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
