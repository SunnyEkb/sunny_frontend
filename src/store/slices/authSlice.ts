import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  avatar?: File | string | null;
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
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUserProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setAuthenticated, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
