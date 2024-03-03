import { FormValues, IFormRowProps, IInputProps } from "../types/FormTypes";

function FormRow<T extends keyof FormValues>({
  label,
  id,
  registerProp,
  error,
  type,
}: IFormRowProps<T>) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <Label label={label} />
      {error && (
        <span className="text-red-500 text-md md:min-w-[220px] text-wrap">
          {error}
        </span>
      )}
      <Input id={id} type={type} reg={registerProp} />
    </div>
  );
}

export default FormRow;

function Label({ label }: { label: string }) {
  return (
    <label className="md:w-[250px]" htmlFor={label}>
      {label}
    </label>
  );
}

function Input<T extends keyof FormValues>({ id, reg, type }: IInputProps<T>) {
  const { register, required, minLength, pattern, validate } = reg;

  return (
    <div className="">
      {type === "text" ||
      type === "number" ||
      type === "email" ||
      type === "password" ? (
        <input
          className="w-[100%] md:w-[300px] border border-gray-300 rounded-sm h-9 pl-2"
          type={type}
          id={id}
          disabled={false}
          {...register(id, {
            required: required,
            min: minLength,
            pattern: pattern,
            validate: validate,
          })}
        />
      ) : (
        ""
      )}

      {type === "textarea" && (
        <textarea
          className="w-full md:w-[300px] border border-gray-300 rounded-sm h-24 pl-2"
          id={id}
          disabled={false}
          {...register(id, {
            required: required,
            min: minLength,
          })}
        ></textarea>
      )}

      {type === "file" && (
        <input
          className="fileInputStyle flex items-center justify-center w-full md:w-[300px] "
          type={type}
          id={id}
          accept="image/*"
          disabled={false}
          {...register(id, {
            required: required,
            min: minLength,
          })}
        />
      )}
    </div>
  );
}
