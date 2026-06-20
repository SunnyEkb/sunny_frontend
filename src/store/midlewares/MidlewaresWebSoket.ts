import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import type {
  CHATPropsMessageSocket,
  ChatSocketMessage,
  wsCHATActions,
} from "../actions/chat";

export interface WsProps {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>; // URL для подключения
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOnOpen: ActionCreatorWithoutPayload;
  wsOnClose: ActionCreatorWithPayload<WsProps>;
  wsOnMessage: ActionCreatorWithPayload<CHATPropsMessageSocket>;
  wsOnError: ActionCreatorWithPayload<string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wsSendMessage?: ActionCreatorWithPayload<any>;
};

export const WS_DEBUG_MIDDLE = true;

export const webSocketMiddleware = (
  wsActions: typeof wsCHATActions,
): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: Socket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;

    return (next) => (action: { type: string; payload?: unknown }) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOnOpen,
        wsOnClose,
        wsOnMessage,
        wsOnError,
        wsSendMessage,
      } = wsActions;

      if (WS_DEBUG_MIDDLE && type.includes("WS")) {
        console.log(`[Socket.IO Middleware] ${type}:`, action.payload);
      }

      // Подключение к сокету
      if (wsConnect.match(action)) {
        const socketUrl = action.payload.url;

        if (socket?.connected) {
          console.log("[Socket.IO] Уже подключено");
          return next(action);
        }

        // URL приходит из CHATWsConnect.

        console.log("[Socket.IO] Подключение к:", socketUrl);

        dispatch(wsConnecting());

        // Создаем подключение Socket.IO
        socket = io(socketUrl, {
          transports: ["websocket", "polling"],
          withCredentials: true,
          autoConnect: true,
          reconnection: true,
          auth: {
            token: action.payload.token,
          },
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        // Обработчики событий
        socket.on("connect", () => {
          console.log("[Socket.IO] Подключено успешно! ID:", socket?.id);

          if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
          }

          dispatch(wsOnOpen());
        });

        socket.on("disconnect", (reason) => {
          console.log("[Socket.IO] Отключено, причина:", reason);

          dispatch(
            wsOnClose({
              reason,
              wasClean: reason === "io client disconnect",
            }),
          );
        });

        socket.on("connect_error", (error) => {
          console.error("[Socket.IO] Ошибка подключения:", error.message);
          dispatch(wsOnError(error.message));
        });

        socket.on("error", (error) => {
          console.error("[Socket.IO] Ошибка:", error);
          dispatch(wsOnError(error.message || "Неизвестная ошибка"));
        });

        // Обработка пользовательских событий (сообщения)
        socket.on("message:received", (data: ChatSocketMessage) => {
          console.log("[Socket.IO] Получено сообщение:", data);

          dispatch(
            wsOnMessage({
              id: data.id,
              message: data.text,
              sender_id: data.sender_id,
              sender_username: data.sender_username,
              avatar: data.avatar,
              created_at: data.date,
              updated_at: data.date,
            }),
          );
        });

        socket.on("message:read", (data) => {
          console.log("[Socket.IO] Сообщение прочитано:", data);
        });

        socket.on("user:online", (data) => {
          console.log("[Socket.IO] Пользователь онлайн:", data);
        });

        socket.on("user:offline", (data) => {
          console.log("[Socket.IO] Пользователь офлайн:", data);
        });

        socket.on("user:typing", (data) => {
          console.log("[Socket.IO] Печатает:", data);
        });

        socket.on("error", (data) => {
          console.error("[Socket.IO] Ошибка от сервера:", data);
        });
      }

      // Отправка сообщений
      if (wsSendMessage?.match(action) && socket?.connected) {
        const { message, event = "message:send", ...allData } = action.payload as unknown as {
          event?: string;
          message: string;
          optimisticMessage?: unknown;
        };

        delete allData.optimisticMessage;

        const data = {
          text: message,
          ...allData,
        };

        if (WS_DEBUG_MIDDLE) {
          console.log(`[Socket.IO] Отправка события ${event}:`, data);
        }

        socket.emit(event, data);
      }

      // Отключение
      if (wsDisconnect.match(action) && socket) {
        console.log("[Socket.IO] Отключение...");

        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }

        if (socket.connected) {
          socket.disconnect();
        }

        socket.removeAllListeners();
        socket = null;
      }

      return next(action);
    };
  }) as Middleware;
};
