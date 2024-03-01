import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormValues {
  name: string;
  capacity: string;
  price: string;
  discount: string;
  description: string;
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
  type: "text" | "number" | "textarea" | "fileinput";
}

export interface IInputProps<T extends keyof FormValues> {
  id: T;
  reg: {
    register: UseFormRegister<FormValues>;
    required: string;
    min?: { value: number; message: string };
  };
  error?: string;
  type: "text" | "number" | "textarea" | "fileinput";
}
