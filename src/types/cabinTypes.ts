export interface ICabinTypes {
  id: string;
  cabin: { name: string; category: string };
  capacity: number;
  price: number;
  discount: number | string;
  img: string;
}
