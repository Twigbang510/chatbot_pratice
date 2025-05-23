import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../pages/ChatPage/ChatPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat/" />} />

      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:chatId" element={<ChatPage />} />
      <Route path="*" element={<h4> 404 - Page Not Found </h4>} />
    </Routes>
  );
};

export default AppRoutes;
