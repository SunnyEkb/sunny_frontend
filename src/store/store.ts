import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./auth-api/authApi";
import authReducer from "./slices/authSlice";
import { servicesApi } from "./entities/services/services";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import servicesSlice from "./slices/serviceSlice";
import { webSocketMiddleware } from "./midlewares/MidlewaresWebSoket";
import { wsCHATActions } from "./actions/chat";
import { wsChatReducer } from "./slices/wsChatSlice";
import { searchApi } from "./entities/search/searchApi";
import { adsApi } from "./entities/ads/adsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
    auth: authReducer,
    services: servicesSlice,
    wsChat: wsChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(servicesApi.middleware)
      .concat(searchApi.middleware)
      .concat(adsApi.middleware)
      .concat(webSocketMiddleware(wsCHATActions)),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
