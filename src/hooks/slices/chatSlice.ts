import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { current, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatState } from "../../types/chat_slice";
import {
  getChatMessage,
  saveChatMessage,
  removeChatSession as removeChatSessionStorage,
  updateChatSession,
} from "../../utils/storage";
import type { Message } from "../../types/message";
import { createNewChatSession, createNewMessage } from "../../utils/chat";
import type { ChatSession } from "../../types/chat";
import { callOpenAi } from "../../utils/openai";

const initialState: ChatState = {
  chatId: "",
  messagesByChatId: {},
  chatSession: [],
  sidebarVisible: true,
  isLoading: false,
  editTitleId: null,
  newTitle: "",
  error: null,
};
export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessageAsync",
  async ({ chatId, content }: { chatId: string; content: string }) => {
    const userMsg = createNewMessage(content);
    const res = await callOpenAi(content);

    const now = Date.now();
    const botMsg: Message = {
      id: `${now}-bot`,
      sender: "bot",
      content: res,
      timestamp: now,
    };
    return { chatId, userMsg, botMsg };
  },
);
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const storeMessages = getChatMessage(chatId);
      state.chatId = chatId;
      state.messagesByChatId[chatId] = storeMessages;
    },

    startNewChatWithText: (state, action: PayloadAction<string>) => {
      const content = action.payload;
      const { newId, messages, session } = createNewChatSession(content);
      state.chatId = newId;
      state.messagesByChatId[newId] = messages;
      state.chatSession.unshift(session);
    },
    setChatSession: (state, action: PayloadAction<ChatSession[]>) => {
      state.chatSession = action.payload;
    },
    addChatSession: (state, action: PayloadAction<ChatSession>) => {
      state.chatSession.unshift(action.payload);
    },
    removeChatSession: (state, action: PayloadAction<string>) => {
      const updated = removeChatSessionStorage(action.payload);
      state.chatSession = updated;
    },
    toggleSidebar: (state) => {
      state.sidebarVisible = !state.sidebarVisible;
    },

    editChatSessionTitle: (
      state,
      action: PayloadAction<{ id: string | null; newTitle: string }>,
    ) => {
      const { id, newTitle } = action.payload;
      state.editTitleId = id;
      state.newTitle = newTitle;
      console.log(current(state.chatSession));
      const updated = state.chatSession.map((s) => {
        if (s.id === id) {
          console.log("s", current(s));
          return { ...s, title: newTitle };
        }
        return s;
      });
      console.log(updated);
      updateChatSession(updated);
      state.chatSession = updated;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        const { chatId, userMsg, botMsg } = action.payload;
        const current = state.messagesByChatId[chatId] || [];
        const updated = [...current, ...userMsg, botMsg];
        state.messagesByChatId[chatId] = updated;
        saveChatMessage(chatId, updated);
        state.isLoading = false;
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  openChat,
  startNewChatWithText,
  setChatSession,
  addChatSession,
  removeChatSession,
  toggleSidebar,
  editChatSessionTitle,
} = chatSlice.actions;
export default chatSlice.reducer;
