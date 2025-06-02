import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {
  ChatMessages,
  CHATWsConnect,
  CHATWsOnClose,
  CHATWsOnError,
  CHATWsOnMessage,
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
        state.status = "init";

        const newMessage = action.payload;

        if (Array.isArray(newMessage)) {
          state.currentMessages = newMessage;
        }
        if (newMessage) {
          state.chat = [...state.chat, newMessage];

          state.currentMessages = [...state.currentMessages, newMessage];
          state.isSuccess = true;
        } else {
          state.chat = [];
        }

        // state.total = action.payload?.total ?? 0;
      });
  },
});

export const { wsChatCloseAction, wsChatErrorAction, wsChatMessageAction } =
  wsCHATSlice.actions;
export const { takeIsSuccess } = wsCHATSlice.selectors;
export const wsChatReducer = wsCHATSlice.reducer;
