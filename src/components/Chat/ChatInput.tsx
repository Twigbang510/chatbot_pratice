import React, { useState } from "react";
import styles from "./Chat.module.css";
import type { onSend } from "../../types/chat";
type Props = {
  onSend: onSend;
};
const ChatInput = ({ onSend }: Props) => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };
  return (
    <div className={styles.inputArea}>
      <input
        type="text"
        placeholder="Start chat with bot"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        role="textbox"
      ></input>
    </div>
  );
};

export default ChatInput;
