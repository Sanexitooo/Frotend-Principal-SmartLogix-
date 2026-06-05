export interface ChatMessage {
  text: string;
  isBot: boolean;
}

export interface IChatService {
  sendMessage(message: string, history: ChatMessage[]): Promise<string>;
}
