import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRequest } from "../../lib/fetchAPI";

export const getFoods = createAsyncThunk(
  "meals/getMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchRequest("/foods");
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response.message || "You make mistake");
    }
  }
);
