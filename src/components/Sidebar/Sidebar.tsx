import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getChatSession } from "../../utils/storage";
import { createNewChatSession } from "../../utils/chat";
import type { RootState } from "../../hooks/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatSession,
  editChatSessionTitle,
  removeChatSession,
  setChatSession,
  toggleSidebar,
} from "../../hooks/slices/chatSlice";
import MenuIcon from "../../constants/menuIcon";
import SearchIcon from "../../constants/searchIcon";
import NewChatIcon from "../../constants/newChatIcon";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editTitleId, setEditTitleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const sidebarVisible = useSelector((state) => state.chat.sidebarVisible);
  const currentChatId = useSelector((state) => state.chat.chatId);
  const sessions = useSelector((state: RootState) => state.chat.chatSession);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const handleNewChat = () => {
    const { newId, session } = createNewChatSession();
    dispatch(addChatSession(session));
    navigate(`/chat/${newId}`);
  };
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const handleEditTitle = (key) => {
    if (!newTitle) return;
    if (key === "Enter") {
      dispatch(editChatSessionTitle({ id: editTitleId, newTitle: newTitle }));
      setEditTitleId(null);
    } else if (key === "Escape") {
      setEditTitleId(null);
    }
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
      className={`${styles.sidebar} ${!sidebarVisible ? styles.hiddenSidebar : ""}`}
    >
      <div className={styles.sidebar_header}>
        <button className={styles.toggleBtn} onClick={handleSidebar}>
          <MenuIcon className={styles.menuIcon} />
        </button>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} title="Search">
            <SearchIcon className={styles.searchIcon} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={handleNewChat}
            title="New Chat"
          >
            <NewChatIcon className={styles.newChatIcon} />
          </button>
        </div>
      </div>
      <ul className={styles.chatList}>
        {sessions.map((chat) => (
          <li
            key={chat.id}
            className={`${styles.chatItemWrapper} ${chat.id === currentChatId ? styles.selected : ""}`}
          >
            {editTitleId === chat.id ? (
              <input
                className={styles.editInput}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  handleEditTitle(e.key);
                }}
              />
            ) : (
              <Link to={`/chat/${chat.id}`} className={styles.chatItem}>
                {chat.title}
              </Link>
            )}
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
                  <button
                    onClick={() => {
                      setEditTitleId(chat.id);
                      setNewTitle(chat.title);
                    }}
                  >
                    🖊️ Rename
                  </button>
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
