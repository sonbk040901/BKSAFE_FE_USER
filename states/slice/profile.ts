import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { ImagePickerAsset } from "expo-image-picker";
import { User, authApi, profileApi } from "../../api";
import { uploadImg } from "../../utils/upload";
import type { RootState } from "../store";
import { AxiosError } from "axios";

interface ProfileState extends User {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  avatarSource: ImagePickerAsset | null;
}
const initialState: ProfileState = {
  id: 0,
  email: "",
  avatar: null,
  avatarSource: null,
  phone: "",
  gender: "OTHER",
  fullName: "",
  createdAt: "",
  updatedAt: "",
  status: "idle",
  error: null,
};
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  authApi.getProfile,
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (_: void, thunkApi) => {
    const state = (thunkApi.getState() as RootState).profile;
    try {
      const url = state.avatarSource
        ? await uploadImg(state.avatarSource)
        : state.avatar;
      await profileApi.update({
        avatar: url,
        fullName: state.fullName,
        email: state.email,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    patchProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        return { ...state, status: "success", ...action.payload };
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.status = "success";
      }),
});

export const { patchProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
