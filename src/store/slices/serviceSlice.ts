import { createSlice } from "@reduxjs/toolkit";

interface ServiceState {
  page: number;
  search: string;
  status: "init" | "loading" | "success" | "error";
}

const initialState: ServiceState = {
  page: 1,
  search: "",
  status: "init",
};

const servicesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changePageAction: (state, action) => {
      state.page = action.payload;
    },
    changeSearchAction: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
      initPageAction: (state) => {
      state.page = 1;
    },
  },
});

export const { changePageAction, changeSearchAction, initPageAction } = servicesSlice.actions;

export default servicesSlice.reducer;
