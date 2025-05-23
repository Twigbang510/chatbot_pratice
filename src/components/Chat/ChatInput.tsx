import React, { useState } from "react";
import styles from "./Chat.module.css";
import type { onSend } from "../../types/chat";
import { useDispatch } from "react-redux";
type Props = {
  onSend: onSend;
};
const ChatInput = ({ onSend }: Props) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };
  return (
    <div className={styles.inputArea}>
      <textarea
        placeholder="Start chat with bot"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        role="textbox"
        className={styles.chatInput}
      ></textarea>
      <button className={styles.sendBtn} onClick={handleSend}>
        📤
      </button>
    </div>
  );
};

export default ChatInput;
