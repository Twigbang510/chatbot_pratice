import React, { useEffect, useState } from "react";
import styles from "./ChatPage.module.css";
import { useParams } from "react-router-dom";
import { Message } from "../../types/message";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatInput from "../../components/Chat/ChatInput";
import { getChatMessage, saveChatMessage } from "../../utils/storage";
const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessage] = useState<Message[]>([]);
  useEffect(() => {
    const existed = getChatMessage(chatId!);
    setMessage(existed);
  }, [chatId]);
  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: text,
      timestamp: Date.now(),
    };
    const botMsg: Message = {
      id: Date.now().toString() + "-bot",
      sender: "bot",
      content: "im bot",
      timestamp: Date.now(),
    };
    const newMsg = [...messages, userMsg, botMsg];
    setMessage(newMsg);
    saveChatMessage(chatId!, newMsg);
  };

  return chatId ? (
    <div className={styles.chatPage}>
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg}></MessageBubble>
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  ) : (
    <div className={styles.chatPage}>
      <h2>You can make new chat from New Chat button</h2>
      <ChatInput onSend={handleSend} />
    </div>
  );
};
export default ChatPage;
