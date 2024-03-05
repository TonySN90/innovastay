export interface ICabinTypes {
  id: string;
  cabinName: string;
  name: string;
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
