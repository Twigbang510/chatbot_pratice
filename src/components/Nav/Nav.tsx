import React from "react";
import styles from "./Nav.module.css";
import Avatar from "./Avatar";

const Nav: React.FC = () => {
  const isLoggedIn = true;
  const handleLogin = () => {
    console.log("Navigate to login page");
  };
  return (
    <header className={styles.navbar}>
      <a href="/chat" className={styles.logo}>
        🧠
      </a>
      <Avatar isLoggedIn={isLoggedIn} onLoginClick={handleLogin} />
    </header>
  );
};

export default Nav;
