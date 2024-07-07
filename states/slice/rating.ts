import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingApi } from "../../api";
import { type RootState } from "../store";

interface RatingState {
  bookingId?: number;
  rating?: number;
  review?: string;
  status: "idle" | "loading" | "success" | "error";
  error?: string;
}
const initialState: RatingState = {
  status: "idle",
};
export const createRating = createAsyncThunk("rating/create", (_, thunkApi) => {
  const state = thunkApi.getState() as { rating: RatingState };
  const { rating, bookingId, review } = state.rating;
  if (!rating || !bookingId) {
    throw new Error("Invalid rating");
  }
  return bookingApi.createRating({ bookingId, rating, review });
});

const RatingSlice = createSlice({
  name: "Rating",
  initialState,
  reducers: {
    updateRating: (
      state,
      action: PayloadAction<
        Pick<RatingState, "bookingId" | "rating" | "review">
      >,
    ) => {
      return { ...state, ...action.payload };
    },
    clearRating: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRating.rejected, (state) => {
        state.status = "error";
      })
      .addCase(createRating.fulfilled, (state) => {
        state.status = "success";
      }),
});

export const { updateRating, clearRating } = RatingSlice.actions;
export const selectRating = (state: RootState) => state.rating;

export default RatingSlice.reducer;
