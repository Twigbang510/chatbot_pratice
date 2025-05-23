import React from "react";
import styles from "./Nav.module.css";
import Avatar from "./Avatar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleSidebar } from "../../hooks/slices/chatSlice";

const Nav: React.FC = () => {
  const isLoggedIn = true;
  const dispatch = useAppDispatch();
  const sidebarVisible = useAppSelector((state) => state.chat.sidebarVisible);
  const handleLogin = () => {
    console.log("Navigate to login page");
  };
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <header className={styles.navbar}>
      {!sidebarVisible && (
        <button className={styles.toggleBtn} onClick={handleSidebar}>
          ☰
        </button>
      )}
      <a href="/chat" className={styles.logo}>
        🧠
      </a>
      <Avatar isLoggedIn={isLoggedIn} onLoginClick={handleLogin} />
    </header>
  );
};

export default Nav;
