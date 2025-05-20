import React from "react";
import styles from "./Chat.module.css";
import { Message } from "../../types/message";
const MessageBubble = ({ id, sender, content, timestamp }: Message) => {
  return (
    <>
      <p
        className={`${styles.bubble} ${sender === "user" ? styles.user : styles.bot}`}
      >
        {content}
      </p>
      <span className={styles.timestamp}>{timestamp}</span>
    </>
  );
};

export default MessageBubble;
