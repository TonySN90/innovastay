import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUpdateCabin,
  deleteCabin,
  getCabins,
} from "../../services/apiCabins";
import { ICabinStatesTypes } from "../../types/cabinTypes";
import {
  IFilterTypes,
  ISortTypes,
  LoadingTypes,
} from "../../types/GlobalTypes";
import { FormValues } from "../../types/FormTypes";

export const fetchCabins = createAsyncThunk(
  "cabins/fetchCabins",
  async (
    filterSortOptions?: {
      sortBy: ISortTypes;
      filter: IFilterTypes | null;
    },
    // @ts-expect-error getState may not be used after optional argument
    { getState }
  ) => {
    const { cabins } = getState() as {
      cabins: ICabinStatesTypes;
    };

    const { sortBy, filter } = filterSortOptions || {};

    if (
      cabins.uploadingStatus === LoadingTypes.SUCCESS ||
      cabins.updatingStatus === LoadingTypes.SUCCESS ||
      cabins.deletingStatus === LoadingTypes.SUCCESS
    )
      return await getCabins(filter as IFilterTypes, sortBy);

    // if (bookings?.bookings.length > 0) {
    //   return bookings.bookings;
    // }

    return await getCabins(filter as IFilterTypes, sortBy);
  }
);

export const uploadCabin = createAsyncThunk(
  "cabins/uploadCabin",
  async (newCabin: FormValues) => {
    const uploadedCabin = await createUpdateCabin(newCabin);
    return uploadedCabin;
  }
);

export const editCabin = createAsyncThunk(
  "cabins/editCabin",
  async ({
    id,
    toUpdatedCabin,
  }: {
    id: number;
    toUpdatedCabin: FormValues;
  }) => {
    const updatedCabin = await createUpdateCabin(toUpdatedCabin, id);
    return updatedCabin;
  }
);

export const deleteCabinThunk = createAsyncThunk(
  "cabins/deleteCabin",
  async (cabinId: number) => {
    const deletedCabin = await deleteCabin(cabinId);
    return deletedCabin;
  }
);

const initialState = {
  loadingStatus: "idle",
  uploadingStatus: "idle",
  updatingStatus: "idle",
  deletingStatus: "idle",
  error: "",
  cabins: [],
} as ICabinStatesTypes;

const cabinsSlice = createSlice({
  name: "cabins",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.uploadingStatus = "idle";
    },

    resetUpdatingStatus: (state) => {
      state.updatingStatus = "idle";
    },

    resetDeletingStatus: (state) => {
      state.deletingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabins.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchCabins.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.cabins = action.payload;
      })
      .addCase(fetchCabins.rejected, (state) => {
        state.loadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Abruf der Zimmerdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(uploadCabin.pending, (state) => {
        state.uploadingStatus = "loading";
      })
      .addCase(uploadCabin.fulfilled, (state) => {
        state.uploadingStatus = "success";
      })
      .addCase(uploadCabin.rejected, (state) => {
        state.uploadingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Erstellen der Zimmerdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(editCabin.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(editCabin.fulfilled, (state) => {
        state.updatingStatus = "success";
      })
      .addCase(editCabin.rejected, (state) => {
        state.updatingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Aktualisieren der Zimmerdaten. Bitte versuchen Sie es erneut.";
      })
      .addCase(deleteCabinThunk.pending, (state) => {
        state.deletingStatus = "loading";
      })
      .addCase(deleteCabinThunk.fulfilled, (state) => {
        state.deletingStatus = "success";
      })
      .addCase(deleteCabinThunk.rejected, (state) => {
        state.deletingStatus = "error";
        state.error =
          "Es gab ein Problem bei dem Löschen der Zimmerdaten. Bitte versuchen Sie es erneut.";
      });
  },
});

export default cabinsSlice.reducer;
export const { resetStatus, resetUpdatingStatus, resetDeletingStatus } =
  cabinsSlice.actions;
