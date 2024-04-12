export interface ICabinTypes {
  id: number;
  cabinName: string;
  name: string;
  category: string;
  capacity: number;
  price: number;
  discount?: number;
  img: string;
  image: string;
  description: string;
}

export interface ICabinStatesTypes {
  loadingStatus: "idle" | "loading" | "error";
  uploadingStatus: "idle" | "success" | "loading" | "error";
  updatingStatus: "idle" | "success" | "loading" | "error";
  deletingStatus: "idle" | "success" | "loading" | "error";
  error: string;
  cabins: ICabinTypes[];
  count: number;
}
