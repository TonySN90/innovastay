import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormValues {
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
  file: File;
  register: UseFormRegister<FieldValues>;
}

export interface IFormRowProps<T extends keyof FormValues> {
  id: T;
  label: string;
  registerProp: {
    register: UseFormRegister<FormValues>;
    required: string;
    min?: { value: number; message: string };
  };
  error?: string;
  type: "text" | "number" | "textarea" | "file";
}

export interface IInputProps<T extends keyof FormValues> {
  id: T;
  reg: {
    register: UseFormRegister<FormValues>;
    required: string;
    min?: { value: number; message: string };
  };
  error?: string;
  type: "text" | "number" | "textarea" | "file";
}
