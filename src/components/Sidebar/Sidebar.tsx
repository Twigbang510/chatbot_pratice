import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getChatSession } from "../../utils/storage";
import { createNewChatSession } from "../../utils/chat";
import type { RootState } from "../../hooks/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatSession,
  removeChatSession,
  setChatSession,
} from "../../hooks/slices/chatSlice";
const Sidebar = ({ visible, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.chat.chatSession);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const handleNewChat = () => {
    const { newId, session } = createNewChatSession();
    dispatch(addChatSession(session));
    navigate(`/chat/${newId}`);
  };
  const handleDeleteChat = (id: string) => {
    const confirm = window.confirm("Are you really want to delete this chat");
    if (!confirm) return;
    dispatch(removeChatSession(id));
    const remaining = getChatSession();
    dispatch(setChatSession(remaining));
    setMenuOpenId(null);

    if (remaining.length > 0) {
      navigate(`/chat/${remaining[0].id}`, { replace: true });
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    const stored = getChatSession();
    dispatch(setChatSession(stored));
  }, [dispatch]);

  return (
    <aside
      className={`${styles.sidebar} ${visible ? styles.hiddenSidebar : ""}`}
    >
      <div className={styles.sidebar_header}>
        <button className={styles.toggleBtn} onClick={onToggle}>
          ☰
        </button>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} title="Search">
            🔍
          </button>
          <button
            className={styles.iconBtn}
            onClick={handleNewChat}
            title="New Chat"
          >
            ➕
          </button>
        </div>
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
