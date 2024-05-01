import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout, signup } from "../../services/apiAuth";
import { LoadingTypes } from "../../types/GlobalTypes";
import { IAuthStatesTypes } from "../../types/AuthTypes";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) =>
    login({ email, password })
);

export const logoutThunk = createAsyncThunk("auth/logout", async () =>
  logout()
);

export const getUserThunk = createAsyncThunk("auth/user", async () =>
  getUser()
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async ({ fullName, email, password }) => {
    return signup({ fullName, email, password });
  }
);

const initialState = {
  login: {},
  user: {},
  newUser: {},
  loadingStatus: LoadingTypes.IDLE,
  logoutLoadingStatus: LoadingTypes.IDLE,
  userLoadingStatus: LoadingTypes.IDLE,
  signupLoadingStatus: LoadingTypes.IDLE,
  error: "",
} as IAuthStatesTypes;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoadingStatus: (state) => {
      state.loadingStatus = LoadingTypes.IDLE;
    },

    resetUserLoadingStatus: (state) => {
      state.userLoadingStatus = LoadingTypes.IDLE;
    },

    resetUserStates: (state) => {
      state.logoutLoadingStatus = LoadingTypes.IDLE;
      state.user = {};
      state.login = {};
    },

    deleteError: (state) => {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(loginThunk.pending, (state) => {
        state.loadingStatus = LoadingTypes.LOADING;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loadingStatus = LoadingTypes.SUCCESS;
        state.login = action.payload;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loadingStatus = LoadingTypes.ERROR;
        state.error = "E-Mail oder Passwort ungültig. Versuche es erneut.";
      })
      // logout
      .addCase(logoutThunk.pending, (state) => {
        state.logoutLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.logoutLoadingStatus = LoadingTypes.SUCCESS;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.logoutLoadingStatus = LoadingTypes.ERROR;
        state.error = "Fehler beim Logout";
      })
      // getUser
      .addCase(getUserThunk.pending, (state) => {
        state.userLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userLoadingStatus = LoadingTypes.SUCCESS;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.userLoadingStatus = LoadingTypes.ERROR;
        state.error = "Fehler beim Laden des Benutzers";
      })
      // signup
      .addCase(signupThunk.pending, (state) => {
        state.signupLoadingStatus = LoadingTypes.LOADING;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.signupLoadingStatus = LoadingTypes.SUCCESS;
        state.newUser = action.payload;
      })
      .addCase(signupThunk.rejected, (state) => {
        state.signupLoadingStatus = LoadingTypes.ERROR;
        state.error = "Fehler beim Anlegen des Benutzers";
      });
  },
});

export default authSlice.reducer;

export const {
  resetLoadingStatus,
  resetUserStates,
  resetUserLoadingStatus,
  deleteError,
} = authSlice.actions;
