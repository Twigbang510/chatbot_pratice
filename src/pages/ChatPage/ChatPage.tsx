import { useEffect, useState } from "react";
import styles from "./ChatPage.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Message } from "../../types/message";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatInput from "../../components/Chat/ChatInput";
import { getChatMessage, saveChatMessage } from "../../utils/storage";
import { createNewChatSession } from "../../utils/chat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/store";
import {
  openChat,
  sendMessage,
  sendMessageAsync,
  startNewChatWithText,
} from "../../hooks/slices/chatSlice";
import { useAppDispatch } from "../../hooks/hooks";
const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string | "" }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentChatId = useSelector((state: RootState) => state.chat.chatId);
  const messages = useSelector(
    (state: RootState) => state.chat.messagesByChatId[chatId!] || [],
  );
  useEffect(() => {
    if (chatId) {
      dispatch(openChat(chatId));
    } else {
      navigate(`/chat/${currentChatId}`);
    }
  }, [chatId, currentChatId]);
  const handleSend = (content: string) => {
    if (!chatId) {
      dispatch(startNewChatWithText(content));
      return;
    }
    dispatch(sendMessageAsync({ chatId, content }));
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
