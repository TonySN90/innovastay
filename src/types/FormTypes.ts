export interface FormValues {
  name: string;
  capacity: string;
  price: string;
  discount: string;
  description: string;
}

export interface IOnSubmitType {
  data: object;
  event: React.FormEvent<HTMLFormElement>;
}
