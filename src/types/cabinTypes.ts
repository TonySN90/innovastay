export interface ICabinTypes {
  id: string;
  cabinName: string;
  cabin_name: string;
  category: string;
  capacity: number;
  price: number;
  discount: number | string;
  img: string;
}

export interface ICabinStatesTypes {
  status: "idle" | "loading" | "error";
  error: string;
  cabins: ICabinTypes[];
}
