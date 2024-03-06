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
  lastStay: string;
  maxStays: number;
  information: string;
}

export interface IGuestStatesTypes {
  status: "idle" | "loading" | "error";
  error: string;
  guests: IGuestTypes[];
}
