export interface ICabinTypes {
  id: string;
  cabinName: string;
  name: string;
  category: string;
  capacity: number;
  price: number;
  discount: number | string;
  img: string;
  image: string;
}

export interface ICabinStatesTypes {
  loadingStatus: "idle" | "loading" | "error";
  uploadingStatus: "idle" | "success" | "loading" | "error";
  error: string;
  cabins: ICabinTypes[];
}
