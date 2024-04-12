export interface IGuestTypes {
  id: number;
  created_at: string;
  fullName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  guestSince: string;
  maxStays: number;
  information: string;
}

export interface IGuestStatesTypes {
  uploadingStatus: "idle" | "loading" | "success" | "error";
  loadingStatus: "idle" | "loading" | "error";
  deletingStatus: "idle" | "success" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  error: string;
  guests: IGuestTypes[];
  count: number;
}
