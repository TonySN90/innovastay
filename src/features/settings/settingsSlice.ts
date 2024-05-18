import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ISettingsStatesTypes,
  ISettingsTypes,
} from "../../types/settingsTypes";
import { getSettings, updateSettings } from "../../services/apiSettings";

export const getSettingsThunk = createAsyncThunk(
  "settings/getSettings",
  async () => {
    const { settings } = await getSettings();
    return settings;
  }
);

export const updateSettingsThunk = createAsyncThunk(
  "settings/updateSettings",
  async ({ newSettings, id }: { newSettings: ISettingsTypes; id: number }) => {
    const updatedSettings = await updateSettings(newSettings, id);
    return updatedSettings;
  }
);

const initialState = {
  loadingStatus: "idle",
  updatingStatus: "idle",
  error: "",
  settings: [],
} as ISettingsStatesTypes;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loadingStatus = "idle";
    },

    resetUpdatingStatus: (state) => {
      state.updatingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsThunk.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(getSettingsThunk.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.settings = action.payload;
      })
      .addCase(getSettingsThunk.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Einstellungen. Bitte versuchen Sie es erneut.";
      })
      .addCase(updateSettingsThunk.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(updateSettingsThunk.fulfilled, (state) => {
        state.updatingStatus = "success";
      })
      .addCase(updateSettingsThunk.rejected, (state) => {
        state.updatingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Updating der Einstellungen. Bitte versuchen Sie es erneut.";
      });
  },
});

export default settingsSlice.reducer;
export const { resetStatus, resetUpdatingStatus } = settingsSlice.actions;
