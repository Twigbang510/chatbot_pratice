import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  getChatSession,
  removeChatSession,
  saveChatSession,
} from "../../utils/storage";
import { ChatSession } from "../../types/chat";
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSession] = useState<ChatSession[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const handleNewChat = () => {
    const newId = uuid();
    const session: ChatSession = {
      id: newId,
      title: "New Chat",
      createAt: Date.now(),
    };
    saveChatSession(session);
    setSession((prev) => [session, ...prev]);

    navigate(`/chat/${newId}`);
  };
  const handleDeleteChat = (id: string) => {
    const confirm = window.confirm("Are you really want to delete this chat");
    if (!confirm) {
      return;
    }
    removeChatSession(id);
    const remaining = getChatSession();
    setMenuOpenId(null);
    setSession(remaining);
    if (remaining.length > 0) {
      navigate(`/chat/${remaining[0].id}`, { replace: true });
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    const stored = getChatSession();
    setSession(stored);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <button className={styles.newChatBtn} onClick={handleNewChat}>
          New chat
        </button>
      </div>
      <ul className={styles.chatList}>
        {sessions.map((chat) => (
          <li key={chat.id} className={styles.chatItemWrapper}>
            <Link to={`/chat/${chat.id}`} className={styles.chatItem}>
              {chat.title}
            </Link>
            <div className={styles.chatActions}>
              <button
                onClick={() =>
                  setMenuOpenId(menuOpenId == chat.id ? null : chat.id)
                }
                className={styles.menuBtn}
              >
                ⋮
              </button>
              {menuOpenId === chat.id && (
                <div className={styles.dropdown}>
                  <button onClick={() => handleDeleteChat(chat.id)}>
                    🗑️ Delete{" "}
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
