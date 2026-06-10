import { GoogleGenAI } from "@google/genai";
import type { ChatMessage, IChatService } from "@/types/ai";

let aiInstance: GoogleGenAI | null = null;

const getAIClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la API Key. Agrega VITE_GEMINI_API_KEY en tu archivo .env");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const chatService: IChatService = {
  async sendMessage(mensajeUsuario: string, historialPrevio: ChatMessage[]): Promise<string> {
    try {
      const ai = getAIClient();

      const contents = historialPrevio.map((msg) => ({
        role: msg.isBot ? ("model" as const) : ("user" as const),
        parts: [{ text: msg.text }],
      }));

      contents.push({
        role: "user" as const,
        parts: [{ text: mensajeUsuario }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction:
            "Eres SmartBot, el asistente virtual de SmartLogix, una plataforma de software de logística. " +
            "REGLA DE ORO: Responde siempre de forma muy breve, corta y directa (máximo 3 líneas). " +
            "Si un usuario te pregunta por planes o qué alternativa usar para su negocio (como armado de PC o tiendas), sé amable, dale la bienvenida y recomiéndale directamente uno de nuestros tres planes: " +
            "1) Plan Emprendedor (para control básico de inventario), 2) Plan Pro (el más recomendado para pymes en crecimiento que hacen envíos) o 3) Plan Enterprise (operaciones grandes). " +
            "Solo si la pregunta es totalmente ajena a la logística o al interés en la plataforma, di en una sola línea que solo ayudas con temas de SmartLogix.",
          temperature: 0.5,
        },
      });

      return response.text || "No obtuve una respuesta clara del asistente de logística.";
    } catch (error: any) {
      console.error("Error en Gemini Service:", error);

      const errorString = String(error?.message || error);
      
      // Si se agota la cuota (429) o el servidor cae (503), el bot responde de respaldo sin caerse
      if (errorString.includes("429") || errorString.includes("503") || errorString.includes("quota")) {
        const msgLower = mensajeUsuario.toLowerCase();
        
        if (msgLower.includes("plan") || msgLower.includes("precio") || msgLower.includes("recomienda")) {
          return "¡Hola! Para tu negocio te recomiendo el **Plan Pro**, que es el ideal para pymes en crecimiento. También contamos con el **Plan Emprendedor** para inventarios pequeños y el **Plan Enterprise**.";
        }
        
        return "¡Hola! Bienvenido a SmartLogix. Optimizamos tu inventario y envíos de manera inteligente. ¿En qué te puedo ayudar hoy con la gestión de tu negocio?";
      }

      throw new Error("El servicio de Google AI Studio experimentó un problema. Inténtalo de nuevo.");
    }
  },
};