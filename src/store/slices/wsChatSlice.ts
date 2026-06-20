import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  ChatMessages,
  CHATWsConnect,
  CHATWsOnClose,
  CHATWsOnError,
  CHATWsOnMessage,
  CHATWsSendMessage,
  // CHATWsOnOpen,
} from "../actions/chat";

interface State {
  chat: ChatMessages[];
  currentMessages: ChatMessages[];
  isSuccess: boolean;
  total: number;
  connectingErrorMessage: string;
  status: "init" | "loading" | "success" | "error" | "closed";
}

export const defaultWsCHATState: State = {
  chat: [],
  isSuccess: false,
  currentMessages: [],
  total: 0,
  connectingErrorMessage: "",
  status: "init",
};

export const wsCHATSlice = createSlice({
  name: "wsChat",
  initialState: defaultWsCHATState,
  reducers: {
    wsChatCloseAction: (state) => {
      state.chat = [];
      state.connectingErrorMessage = "";
    },
    wsChatErrorAction: (state, action) => {
      state.connectingErrorMessage = action.payload;
    },
    wsChatMessageAction: (state, action) => {
      state.chat = action.payload.chat;
    },
  },
  selectors: {
    takeIsSuccess: (state) => state.isSuccess,
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder
      .addCase(CHATWsConnect, (state) => {
        state.status = "loading";
        state.chat = [];
        state.currentMessages = [];
      })
      // .addCase(CHATWsOnOpen, (state) => {})
      .addCase(CHATWsOnError, (state) => {
        state.status = "error";

        state.chat = [];
      })
      .addCase(CHATWsOnClose, (state) => {
        state.status = "closed";
      })
      .addCase(CHATWsOnMessage, (state, action) => {
        state.status = "success";

        const incomingMessage = action.payload;

        if (Array.isArray(incomingMessage)) {
          state.currentMessages = incomingMessage;
        } else {
          const message = incomingMessage as ChatMessages;
          const pendingMessageIndex = state.currentMessages.findIndex(
            (currentMessage) =>
              currentMessage.pending &&
              currentMessage.message === message.message &&
              currentMessage.sender_username === message.sender_username,
          );

          if (pendingMessageIndex >= 0) {
            state.currentMessages[pendingMessageIndex] = message;
          } else {
            state.currentMessages.push(message);
          }
        }

        state.chat = [...state.currentMessages];
        state.isSuccess = true;
      })
      .addCase(CHATWsSendMessage, (state, action) => {
        state.currentMessages.push({
          ...action.payload.optimisticMessage,
          pending: true,
        });
        state.chat = [...state.currentMessages];
      });
  },
});

export const { wsChatCloseAction, wsChatErrorAction, wsChatMessageAction } =
  wsCHATSlice.actions;
export const { takeIsSuccess } = wsCHATSlice.selectors;
export const wsChatReducer = wsCHATSlice.reducer;
