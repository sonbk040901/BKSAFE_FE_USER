import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Driver } from "../../api";
import { RootState } from "../store";

interface DriverState {
  id?: number;
  info?: Driver;
  status: "idle" | "loading" | "success" | "error";
}
const initialState: DriverState = {
  status: "idle",
};
export const getDriver = createAsyncThunk("driver/detail", async () => 1);

const driverSlice = createSlice({
  name: "Driver",
  initialState,
  reducers: {
    patchDriverId: (state, action: PayloadAction<number | undefined>) => {
      state.id = action.payload;
      if (action.payload === undefined) {
        state.info = undefined;
      }
    },
    patchDriverInfo: (state, action: PayloadAction<Driver | undefined>) => {
      state.info = action.payload;
      state.id = action.payload?.id;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDriver.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getDriver.fulfilled, (state) => {
        state.status = "success";
      }),
});

export const { patchDriverId, patchDriverInfo } = driverSlice.actions;
export const selectDriver = (state: RootState) => state.driver;

export default driverSlice.reducer;
