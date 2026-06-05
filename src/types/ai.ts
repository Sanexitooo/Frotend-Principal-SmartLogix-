/*
 * ============================================
 * Interfaces del sistema de Chat IA
 * ============================================
 *
 * ChatMessage : representa un mensaje individual en la conversación.
 * IChatService : contrato (interfaz) que cualquier servicio de IA debe implementar.
 *
 * Beneficio de IChatService (principio de Inversión de Dependencias):
 *   El hook useChat depende de esta interfaz, no de una implementación concreta.
 *   Esto permite cambiar de OpenRouter a Gemini (o cualquier otro proveedor)
   cambiando UNA SOLA LÍNEA en useChat.ts.
 */

/** Un mensaje en el historial del chat */
export interface ChatMessage {
  text: string;
  isBot: boolean; // true = respuesta del bot, false = mensaje del usuario
}

/**
 * Contrato que cualquier servicio de chat IA debe cumplir.
 * Para agregar un nuevo proveedor (Gemini, Claude, etc.):
 *   1. Crea un archivo en src/services/ que implemente esta interfaz.
 *   2. Exporta una instancia como chatService.
 *   3. Cámbiala en src/hooks/use-chat.ts (una sola línea).
 */
export interface IChatService {
  /** Envía un mensaje y el historial, devuelve la respuesta del bot */
  sendMessage(message: string, history: ChatMessage[]): Promise<string>;
}
