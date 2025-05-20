import React from "react";
import styles from "./Nav.module.css";
import { UserAvatar } from "../../types/user_avatar";
const Avatar: React.FC<UserAvatar> = ({ isLoggedIn, onLoginClick }) => {
  return (
    <div className={styles.userSection}>
      {isLoggedIn ? (
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className={styles.avatar}
        />
      ) : (
        <button onClick={onLoginClick} className={styles.loginBtn}>
          Login
        </button>
      )}
    </div>
  );
};

export default Avatar;
