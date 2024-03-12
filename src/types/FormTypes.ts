import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormValues {
  id?: number;
  name?: string;
  fullName?: string;
  category?: string;
  capacity?: number;
  price?: number;
  discount?: number;
  description?: string;
  image: File[] | string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  register?: UseFormRegister<FieldValues>;
  nights?: number;
  guests?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
  isUploading?: boolean;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  phone?: string;
  guestSince?: string;
  maxStays?: number;
  information?: string;
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  extrasPrice?: number;
}

export interface IFormRowProps<T extends keyof FormValues> {
  id: T;
  label: string;
  registerProp: {
    register: UseFormRegister<FormValues>;
    required: string | boolean;
    pattern?: { value: RegExp; message: string };
    minLength?: { value: number; message: string };
    validate?: (value: FormValues[T]) => string | boolean;
    min?: { value: number; message: string };
  };
  error?: string;
  isUploading?: boolean;
  type:
    | "text"
    | "number"
    | "textarea"
    | "file"
    | "email"
    | "password"
    | "passwordConfirm";
}

export interface IInputProps<T extends keyof FormValues> {
  id: T;
  isUploading: boolean | undefined;
  reg: {
    register: UseFormRegister<FormValues>;
    required: string | boolean;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    validate?: (value: FormValues[T]) => string | boolean;
  };
  error?: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "file"
    | "email"
    | "password"
    | "passwordConfirm";
}
