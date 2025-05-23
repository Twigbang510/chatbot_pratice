import { ChatSession } from "../types/chat";
import { Message } from "../types/message";
const STORAGE_KEY = "chat_sessions";

export const getChatSession = (): ChatSession[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveChatSession = (session: ChatSession) => {
  const existing = getChatSession();
  const updated = [session, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const updateChatSession = (session: ChatSession[]) => {
  const updated = session;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getChatMessage = (chatId: string) => {
  const raw = localStorage.getItem(`chat_message_${chatId}`);
  return raw ? JSON.parse(raw) : [];
};

export const saveChatMessage = (chatId: string, message: Message[]) => {
  localStorage.setItem(`chat_message_${chatId}`, JSON.stringify(message));
};

export const removeChatSession = (chatId: string): ChatSession[] => {
  const updated = getChatSession().filter((s) => s.id !== chatId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  localStorage.removeItem(`chat_message_${chatId}`);
  return updated;
};
