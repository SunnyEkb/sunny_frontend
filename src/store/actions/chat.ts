import { createAction } from "@reduxjs/toolkit";

import { WsProps } from "../midlewares/MidlewaresWebSoket";

export type StatusTypes = "init" | "loading" | "error" | "closed";

export interface RequestProps {
  status: StatusTypes;
  error: unknown;
  success: boolean;
}

// export interface ChatMessages {
//   created_at: string;
//   id: number;
//   message: string;
//   sender_username: string;
//   updated_at: string;
// }

export interface ChatMessages {
  message: string;
}

export interface CHATProps extends RequestProps, WsProps {
  text: string;
}

export interface CHATPropsMessageSocket {
  message: string;
}

// export interface CHATPropsMessage {
//   created_at: string;
//   id: number;
//   message: string;
//   sender_username: string;
//   updated_at: string;
// }

const CHAT_WS_CONNECT = "CHAT_WS_CONNECT";
const CHAT_WS_DISCONNECT = "CHAT_WS_DISCONNECT";
const CHAT_WS_CONNECTING = "CHAT_WS_CONNECTING";
const CHAT_WS_ON_OPEN = "CHAT_WS_ON_OPEN";
const CHAT_WS_ON_CLOSE = "CHAT_WS_ON_CLOSE";
const CHAT_WS_ON_MESSAGE = "CHAT_WS_ON_MESSAGE";
const CHAT_WS_ON_ERROR = "CHAT_WS_ON_ERROR";
const CHAT_WS_SEND_MESSAGE = "CHAT_WS_SEND_MESSAGE";

export const CHATWsConnect = createAction<string, typeof CHAT_WS_CONNECT>(
  CHAT_WS_CONNECT
);
export const CHATWsDisconnect = createAction(CHAT_WS_DISCONNECT);
export const CHATWsConnecting = createAction(CHAT_WS_CONNECTING);
export const CHATWsOnOpen = createAction(CHAT_WS_ON_OPEN);
export const CHATWsOnClose = createAction<WsProps, typeof CHAT_WS_ON_CLOSE>(
  CHAT_WS_ON_CLOSE
);
export const CHATWsOnMessage = createAction<
  CHATPropsMessageSocket,
  typeof CHAT_WS_ON_MESSAGE
>(CHAT_WS_ON_MESSAGE); // receive messages
export const CHATWsSendMessage = createAction<{ text: string }>(
  CHAT_WS_SEND_MESSAGE
);
export const CHATWsOnError = createAction<string, typeof CHAT_WS_ON_ERROR>(
  CHAT_WS_ON_ERROR
);

export const wsCHATActions = {
  wsConnect: CHATWsConnect,
  wsDisconnect: CHATWsDisconnect,
  wsConnecting: CHATWsConnecting,
  wsOnOpen: CHATWsOnOpen,
  wsOnClose: CHATWsOnClose,
  wsOnMessage: CHATWsOnMessage,
  wsSendMessage: CHATWsSendMessage,
  wsOnError: CHATWsOnError,
};
