import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ImagePickerAsset } from "expo-image-picker";
import { DriverRegisterDTO } from "../../api/auth";
import { type RootState } from "../store";
import { authApi } from "../../api";

interface ImageSource {
  frontImageSource: ImagePickerAsset | null;
  backImageSource: ImagePickerAsset | null;
}

export interface DriverRegisterState extends DriverRegisterDTO {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  cccd: DriverRegisterDTO["cccd"] & ImageSource;
  license: DriverRegisterDTO["license"] & ImageSource;
  tab: number;
}
const current = new Date().toString();
const initialState: DriverRegisterState = {
  status: "idle",
  cccd: {
    fullName: "",
    address: "",
    frontImage: "",
    backImage: "",
    birthday: current,
    number: "",
    expireDate: current,
    issueDate: current,
    backImageSource: null,
    frontImageSource: null,
  },
  license: {
    fullName: "",
    address: "",
    frontImage: "",
    backImage: "",
    birthday: current,
    number: "",
    expireDate: current,
    issueDate: current,
    classType: "",
    backImageSource: null,
    frontImageSource: null,
  },
  tab: 0,
};

export const submitDriverRegister = createAsyncThunk(
  "driver-register/submit",
  async (data: DriverRegisterDTO, { rejectWithValue }) => {
    try {
      await authApi.registerDriver(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const driverRegisterSlice = createSlice({
  name: "driver-register",
  initialState,
  reducers: {
    patchRegisterDriver: (
      state,
      action: PayloadAction<Partial<DriverRegisterState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    patchRegisterCccd: (
      state,
      action: PayloadAction<Partial<DriverRegisterState["cccd"]>>,
    ) => {
      return { ...state, cccd: { ...state.cccd, ...action.payload } };
    },
    patchRegisterLicense: (
      state,
      action: PayloadAction<Partial<DriverRegisterState["license"]>>,
    ) => {
      return { ...state, license: { ...state.license, ...action.payload } };
    },
    clearRegisterDriver: () => {
      return { ...initialState };
    },
  },
});

export const {
  patchRegisterDriver,
  patchRegisterCccd,
  patchRegisterLicense,
  clearRegisterDriver,
} = driverRegisterSlice.actions;
export const selectRegisterDriver = (state: RootState) => state.registerDriver;
export const selectRegisterTab = createSelector(
  selectRegisterDriver,
  (state) => state.tab,
);
export const selectRegisterCccd = createSelector(
  selectRegisterDriver,
  (state) => state.cccd,
);
export const selectRegisterLicense = createSelector(
  selectRegisterDriver,
  (state) => state.license,
);
export default driverRegisterSlice.reducer;
