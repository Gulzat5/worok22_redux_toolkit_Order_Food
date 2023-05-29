import { createSlice } from "@reduxjs/toolkit";
import { addItem, getBusket } from "./basketThunk";

const initialState = {
  items: [],
  isLoading: false,
  isError: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBusket.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.isError = "";
      })
      .addCase(getBusket.pending, (state) => {
        state.isLoading = true;
        state.items = [];
        state.isError = "";
      })
      .addCase(getBusket.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.isError = action.payload;
      })
      /////////////////////////////
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = [];
        state.isError = "";
        state.isLoading = false;
      })
      .addCase(addItem.pending, (state, action) => {
        state.items = [];
        state.isError = "";
        state.isLoading = true;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.items = [];
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});
