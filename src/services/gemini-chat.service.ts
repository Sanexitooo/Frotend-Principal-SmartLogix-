import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage, IChatService } from "@/types/ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

const SYSTEM_INSTRUCTION =
  "Eres SmartBot, el asistente virtual inteligente de la plataforma SmartLogix. Tu objetivo es ayudar a los usuarios con la gestión logística, optimización de rutas y soporte del dashboard. Base de conocimientos obligatoria:\n1. Rutas: Reducimos costos de combustible en un 25% mediante algoritmos optimizados según el tráfico real.\n2. GPS: Monitoreo de flota en tiempo real integrado en el dashboard.\n3. Precios: Plan Basic ($20.000) and Plan Enterprise ($100.000).\n4. Integraciones: Shopify, Vtex y APIs personalizadas.\n5. Seguridad: Arquitectura basada en 'Privacy by Design' para proteger datos operativos.\n6. Soporte humano: Si el usuario pide hablar con un humano o un ejecutivo, dile que has escalado la solicitud y un experto se conectará en breve.\nResponde de forma concisa, profesional y usa emojis amigables. Si te preguntan cosas fuera de la logística o SmartLogix, amablemente vuelve a enfocar la conversación.";

const API_ERROR_PREFIX = "⚠️ Error";

export class GeminiChatService implements IChatService {
  async sendMessage(message: string, history: ChatMessage[]): Promise<string> {
    if (!apiKey) {
      throw new Error("API Key no configurada");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const historyToPass = history
      .filter((m) => !m.text.startsWith(API_ERROR_PREFIX))
      .map((m) => ({
        role: m.isBot ? "model" as const : "user" as const,
        parts: [{ text: m.text }],
      }));

    const chat = model.startChat({ history: historyToPass });
    const result = await chat.sendMessage(message);
    return result.response.text();
  }
}

export const chatService = new GeminiChatService();
