import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRequest } from "../../lib/fetchAPI";

export const addItem = createAsyncThunk(
  `basket/addItem`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchRequest(`/foods/${payload.id}/addToBasket`, {
        method: "POST",
        body: { amount: payload.amount },
      });

      dispatch(getBusket());

      return await response.items;
    } catch (error) {
      return rejectWithValue(
        error?.response.messenge ||
          "You make mistske don't worry end never give up"
      );
    }
  }
);
////////
export const incrementFood = createAsyncThunk(
  "basket/incrementFoods",
  async ({ amount, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });

      dispatch(getBusket());

      return await response.items;
    } catch (error) {
      rejectWithValue(error?.response.messege || "You make mistake");
    }
  }
);
///////////
export const decrementFood = createAsyncThunk(
  "basket/decrementFoods",
  async ({ amount, id }, { rejectWithValue, dispatch }) => {
    if (amount !== 0) {
      try {
        const response = await fetchRequest(`/basketItem/${id}/update`, {
          method: "PUT",
          body: { amount: amount },
        });

        dispatch(getBusket());

        return await response.items;
      } catch (error) {
        new Error(error);
      }
    } else {
      try {
        const response = await fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
        });

        dispatch(getBusket());

        return await response.items;
      } catch (error) {
        new Error(error);
      }
    }
  }
);
/////////////
export const getBusket = createAsyncThunk(
  "basket/getbusket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchRequest("/basket");

      return response.items;
    } catch (error) {
      return rejectWithValue(error?.response.messege || "You make mistake");
    }
  }
);
///////////
// export const decrementFoodd = (id, amount) => {
//   return async (dispatch) => {
//     if (amount !== 0) {
//       try {
//         const response = await fetchRequest(`/basketItem/${id}/update`, {
//           method: "PUT",
//           body: { amount: amount },
//         });

//         dispatch(getBusket());

//         return await response.items;
//       } catch (error) {
//         new Error(error);
//       }
//     } else {
//       try {
//         const response = await fetchRequest(`/basketItem/${id}/delete`, {
//           method: "DELETE",
//         });

//         dispatch(getBusket());

//         return await response.items;
//       } catch (error) {
//         new Error(error);
//       }
//     }
//   };
// };
