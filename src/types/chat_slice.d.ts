import type { ChatSession } from "./chat";
import type { Message } from "./message";

export interface ChatState {
  chatId: string | "";
  messagesByChatId: Record<string, Message[]>;
  chatSession: ChatSession[];
  isLoading: boolean;
  error: string | null;
}
