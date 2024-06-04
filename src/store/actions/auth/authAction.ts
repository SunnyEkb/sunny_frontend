import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://localhost:3000/api/v1";

interface ParamsAction {
  email: string;
  password: string;
}

export const authAction = createAsyncThunk(
  "auth/authAction",
  async ({ email, password }: ParamsAction, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error duplicate:", error);
      return rejectWithValue;
    }
  }
);
