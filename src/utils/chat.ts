import { v4 as uuid } from "uuid";
import { ChatSession } from "../types/chat";
import { Message } from "../types/message";
import { saveChatMessage, saveChatSession } from "./storage";
import { sendMessageAsync } from "../hooks/slices/chatSlice";

export function createNewChatSession(firstMsg?: string): {
  newId: string;
  messages: Message[];
  session: ChatSession;
} {
  const newId: string = uuid();
  const now = Date.now();

  const messages: Message[] = [];

  const session: ChatSession = {
    id: newId,
    title: firstMsg?.slice(0, 20) || "New Chat",
    createAt: now,
  };
  saveChatSession(session);
  if (firstMsg?.trim()) {
    const newMsg = [...messages, ...createNewMessage(firstMsg)];
    saveChatMessage(newId, newMsg);
  }
  return {
    newId,
    messages,
    session,
  };
}

export function createNewMessage(content: string): Message[] {
  const now = Date.now();
  return [
    {
      id: now.toString(),
      sender: "user",
      content: content,
      timestamp: now,
    },
  ];
}
