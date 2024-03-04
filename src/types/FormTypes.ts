import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormValues {
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
  file: File;
  password: string;
  passwordConfirm: string;
  email: string;
  register: UseFormRegister<FieldValues>;
  nights: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface IFormRowProps<T extends keyof FormValues> {
  id: T;
  label: string;
  registerProp: {
    register: UseFormRegister<FormValues>;
    required: string;
    pattern?: { value: RegExp; message: string };
    minLength?: { value: number; message: string };
    validate?: (value: FormValues[T]) => string | boolean;
    min?: { value: number; message: string };
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

export interface IInputProps<T extends keyof FormValues> {
  id: T;
  reg: {
    register: UseFormRegister<FormValues>;
    required: string;
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
