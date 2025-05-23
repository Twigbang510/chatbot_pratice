import { useEffect } from "react";
import styles from "./ChatPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatInput from "../../components/Chat/ChatInput";
import { RootState } from "../../hooks/store";
import {
  openChat,
  sendMessageAsync,
  startNewChatWithText,
} from "../../hooks/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string | "" }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentChatId = useAppSelector((state: RootState) => state.chat.chatId);
  const messages = useAppSelector(
    (state: RootState) => state.chat.messagesByChatId[chatId!] || [],
  );
  useEffect(() => {
    if (chatId) {
      dispatch(openChat(chatId));
    } else {
      navigate(`/chat/${currentChatId}`);
    }
  }, [chatId, currentChatId, dispatch, navigate]);
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
      <div className={styles.inputSection}>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  ) : (
    <div className={styles.chatPage}>
      <h2>You can make new chat from New Chat button</h2>
      <ChatInput onSend={handleSend} />
    </div>
  );
};
export default ChatPage;
