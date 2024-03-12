export interface IGuestTypes {
  id: string;
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
  error: string;
  guests: IGuestTypes[];
}
