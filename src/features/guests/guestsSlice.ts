import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGuestStatesTypes, IGuestTypes } from "../../types/GuestTypes";
import { getGuests } from "../../services/apiGuests";

export const fetchGuests = createAsyncThunk(
  "guests/fetchGuests",
  async (_, { getState }) => {
    const { guests } = getState() as {
      guests: { guests: IGuestTypes[] };
    };
    if (guests?.guests.length > 0) {
      return guests.guests;
    }

    const newGuests = await getGuests();
    return newGuests;
  }
);

const initialState = {
  status: "idle",
  error: "",
  guests: [],
} as IGuestStatesTypes;

const guestsSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = "idle";
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state) => {
        state.status = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default guestsSlice.reducer;
