import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/apiAuth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    console.log(email, password);
    return login({
      email,
      password,
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {},
    loadingStatus: "idle",
    error: "",
  },
  reducers: {
    resetLoadingStatus: (state) => {
      state.loadingStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loadingStatus = "success";
        state.login = action.payload;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loadingStatus = "Fehler beim login. Versuche es erneut.";
      });
  },
});

export default authSlice.reducer;

export const { resetLoadingStatus } = authSlice.actions;
