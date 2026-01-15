import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../auth-api/authApi";
import { deleteAllCookies } from "../../utils/cookie";

export type AvatarType = File | string | null;

export interface User {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  avatar?: AvatarType;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegistrated(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      deleteAllCookies();
    },
    updateUserProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.checkAuth.matchFulfilled,
        (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setRegistrated, setAuthenticated, setUser, clearUser } =
  authSlice.actions;

export default authSlice.reducer;
