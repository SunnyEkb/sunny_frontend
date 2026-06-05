// import {
//   ActionCreatorWithoutPayload,
//   ActionCreatorWithPayload,
//   Middleware,
//   MiddlewareAPI,
//   PayloadAction,
// } from "@reduxjs/toolkit";
// import { io, Socket } from "socket.io-client";

// export interface WsProps {
//   code: number;
//   wasClean: boolean | null;
// }

// export type TwsActionTypes = {
//   wsConnect: ActionCreatorWithPayload<string>;
//   wsDisconnect: ActionCreatorWithoutPayload;
//   wsConnecting: ActionCreatorWithoutPayload;
//   wsOnOpen: ActionCreatorWithoutPayload;
//   wsOnClose: ActionCreatorWithPayload<WsProps>;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   wsOnMessage: ActionCreatorWithPayload<any>;
//   wsOnError: ActionCreatorWithPayload<string>;

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   wsSendMessage?: ActionCreatorWithPayload<any>;
// };

// export const WS_DEBUG_MIDDLE = false;

// export const webSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
//   return ((store: MiddlewareAPI) => {
//     let socket: WebSocket | null = null;

//     return (next) => (action: PayloadAction) => {
//       const { dispatch } = store;
//       const { type } = action;
//       const {
//         wsConnect,
//         wsDisconnect,
//         wsConnecting,
//         wsOnOpen,
//         wsOnClose,
//         wsOnMessage,
//         wsOnError,

//         wsSendMessage,
//       } = wsActions;

//       if (WS_DEBUG_MIDDLE && type.includes("WS")) {
//         console.log("webSocket:" + type, action.payload);
//       }

//       if (wsConnect.match(action)) {
//         const wsUrl = action.payload as unknown as string | URL;
//         const testUrl = `wss://localhost:3000/chats`;
//         socket = new WebSocket(testUrl);

//         console.log("wsUrl", wsUrl);

//         // const test = io(testUrl as string, {
//         //   withCredentials: true,
//         // })
//         dispatch(wsConnecting());
//       }

//       if (socket) {
//         // receive
//         socket.onmessage = (event) => {
//           const { data } = event;
//           dispatch(wsOnMessage(JSON.parse(data)));
//         };

//         // send
//         if (wsSendMessage?.match(action)) {
//           if (WS_DEBUG_MIDDLE) {
//             console.log("webSocket:message", action.payload);
//           }

//           socket.send(JSON.stringify(action.payload));
//         }

//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         socket.onopen = (event) => dispatch(wsOnOpen());

//         socket.onerror = (event) => {
//           if (WS_DEBUG_MIDDLE) {
//             console.warn("webSocket:error", event);
//           }

//           dispatch(wsOnError(event.type));
//         };

//         socket.onclose = (event) => {
//           if (WS_DEBUG_MIDDLE) {
//             console.warn("webSocket:close", event);
//           }

//           dispatch(wsOnClose({ wasClean: event.wasClean, code: event.code }));
//         };

//         if (wsDisconnect.match(action)) {
//           if (WS_DEBUG_MIDDLE) {
//             console.log("wsDisconnect");
//           }

//           socket.close();
//         }
//       }

//       next(action);
//     };
//   }) as Middleware;
// };

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { getCookie } from "../../utils/cookie";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wsOnMessage: ActionCreatorWithPayload<any>;
  wsOnError: ActionCreatorWithPayload<string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wsSendMessage?: ActionCreatorWithPayload<any>;
};

export const WS_DEBUG_MIDDLE = true;

export const webSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: Socket | null = null;
    let isConnected = false;
    let reconnectTimer: NodeJS.Timeout | null = null;

    return (next) => (action: PayloadAction) => {
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
        const token = getCookie("access_token");

        if (!token) {
          console.error("No found token", token);
          return;
        }

        if (socket?.connected) {
          console.log("[Socket.IO] Уже подключено");
          return next(action);
        }

        // URL сервера (без /chat, так как namespace указан в сервере)
        // const devURL =  "http://localhost:3000"
        const SOCKET_URL = "https://sunnyekb.ru";

        console.log(
          "[Socket.IO] Подключение к:",
          SOCKET_URL,
          "с токеном:",
          token,
        );

        dispatch(wsConnecting());

        // Создаем подключение Socket.IO
        socket = io(`${SOCKET_URL}/chat`, {
          transports: ["websocket", "polling"],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          auth: {
            token: token,
          },
          extraHeaders: {
            authorization: `Bearer ${token}`,
          },
        });

        // Обработчики событий
        socket.on("connect", () => {
          isConnected = true;
          console.log("[Socket.IO] Подключено успешно! ID:", socket?.id);

          if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
          }

          dispatch(wsOnOpen());
        });

        socket.on("disconnect", (reason) => {
          isConnected = false;
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
        socket.on("message:received", (data) => {
          console.log("[Socket.IO] Получено сообщение:", data);
          dispatch(wsOnMessage({ type: "message:received", payload: data }));
        });

        socket.on("message:read", (data) => {
          console.log("[Socket.IO] Сообщение прочитано:", data);
          dispatch(wsOnMessage({ type: "message:read", payload: data }));
        });

        socket.on("user:online", (data) => {
          console.log("[Socket.IO] Пользователь онлайн:", data);
          dispatch(wsOnMessage({ type: "user:online", payload: data }));
        });

        socket.on("user:offline", (data) => {
          console.log("[Socket.IO] Пользователь офлайн:", data);
          dispatch(wsOnMessage({ type: "user:offline", payload: data }));
        });

        socket.on("user:typing", (data) => {
          console.log("[Socket.IO] Печатает:", data);
          dispatch(wsOnMessage({ type: "user:typing", payload: data }));
        });

        socket.on("error", (data) => {
          console.error("[Socket.IO] Ошибка от сервера:", data);
          dispatch(wsOnMessage({ type: "error", payload: data }));
        });
      }

      // Отправка сообщений
      if (wsSendMessage?.match(action) && socket?.connected) {
        const { message, ...allData } = action.payload as unknown as {
          event: string;
          data: unknown;
          message: string;
        };

        const data = {
          text: message,
          ...allData,
        };

        if (WS_DEBUG_MIDDLE) {
          console.log(`[Socket.IO] Отправка события ${event}:`, data);
        }

        socket.emit("message:send", data);
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
        isConnected = false;
      }

      return next(action);
    };
  }) as Middleware;
};
