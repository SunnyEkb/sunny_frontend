import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface WsProps {
  code: number;
  wasClean: boolean | null;
}

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
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

export const WS_DEBUG_MIDDLE = false;

export const webSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action: PayloadAction) => {
      const {dispatch} = store;
      const {type} = action;
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

      if (WS_DEBUG_MIDDLE && type.includes('WS')) {
        console.log('webSocket:' + type, action.payload);
      }

      if (wsConnect.match(action)) {
        const wsUrl = action.payload as unknown as string | URL;
        socket = new WebSocket(wsUrl);
        dispatch(wsConnecting());
      }

      if (socket) {
        // receive
        socket.onmessage = (event) => {
          const {data} = event;
          dispatch(wsOnMessage(JSON.parse(data)));
        };

        // send
        if (wsSendMessage?.match(wsSendMessage)) {
          if (WS_DEBUG_MIDDLE) {
            console.log('webSocket:message', action.payload);
          }

          socket.send(JSON.stringify(action.payload));
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        socket.onopen = (event) => dispatch(wsOnOpen());

        socket.onerror = (event) => {
          if (WS_DEBUG_MIDDLE) {
            console.warn('webSocket:error', event);
          }

          dispatch(wsOnError(event.type));
        };

        socket.onclose = (event) => {
          if (WS_DEBUG_MIDDLE) {
            console.warn('webSocket:close', event);
          }

          dispatch(wsOnClose({wasClean: event.wasClean, code: event.code}));
        };

        if (wsDisconnect.match(action)) {
          if (WS_DEBUG_MIDDLE) {
            console.log('wsDisconnect');
          }

          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
