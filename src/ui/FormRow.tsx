import { useEffect } from "react";
import { FormValues, IFormRowProps, IInputProps } from "../types/FormTypes";
import DatePicker from "react-datepicker";

function FormRow<T extends keyof FormValues>({
  label,
  id,
  registerProp,
  error,
  type,
  isUploading,
  cabins,
  handleChange,
  date,
  defaultValue,
}: IFormRowProps<T>) {
  // useEffect(() => {
  //   if (defaultValue) {
  //     // handleChange(defaultValue);
  //     console.log(defaultValue);
  //   }
  // }, [defaultValue, handleChange]);

  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <Label label={label} />

      {error && (
        <span className="text-red-500 text-md w-[160px] md:max-w-[220px]">
          {error}
        </span>
      )}

      <Input
        cabins={cabins}
        id={id}
        type={type}
        reg={registerProp}
        isUploading={isUploading}
        handleChange={handleChange}
        // date={date}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormRow;

function Label({ label }: { label: string }) {
  return (
    <label className="md:w-[200px]" htmlFor={label}>
      {label}
    </label>
  );
}

function Input<T extends keyof FormValues>({
  id,
  reg,
  type,
  isUploading,
  cabins,
  handleChange,
  // date,
  defaultValue,
}: IInputProps<T>) {
  const { register, required, minLength, validate } = reg;

  return (
    <>
      {type === "text" ||
      type === "number" ||
      type === "email" ||
      type === "password" ? (
        <input
          className="w-[100%] md:w-[300px] border border-gray-300 rounded-md h-9 pl-2"
          type={type}
          id={id}
          disabled={isUploading}
          {...register(id, {
            required: required,
            min: minLength,
            validate: validate,
          })}
          {...(type === "number" && { min: defaultValue })}
          defaultValue={type === "number" ? defaultValue : null}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        ""
      )}

      {type === "date" && (
        <DatePicker
          id={id}
          className="w-full md:w-[300px] border border-gray-300 rounded-md h-9 pl-2 text-gray-500"
          selected={defaultValue}
          onChange={(date) => handleChange(date)}
          disabled={isUploading}
          dateFormat={"dd.MM.yyyy"}
        />
      )}

      {type === "textarea" && (
        <textarea
          className="w-full md:w-[300px] border border-gray-300 rounded-sm h-24 pl-2"
          id={id}
          disabled={isUploading}
          {...register(id, {
            required: required,
            min: minLength,
          })}
        ></textarea>
      )}

      {type === "file" && (
        <input
          className="fileInputStyle flex items-center justify-center w-full md:w-[300px]"
          type={type}
          id={id}
          accept="image/*"
          disabled={isUploading}
          {...register(id, {
            required: required,
            min: minLength,
          })}
        />
      )}

      {type === "select" ? (
        <select
          // id="cabin"
          className="md:w-[300px] h-9 border border-gray-300 text-gray-500 px-2 rounded-lg"
          disabled={isUploading}
          {...register(id, {
            required: required,
            min: minLength,
          })}
          onChange={(e) => {
            id === "cabinId" &&
              handleChange(
                cabins.filter((cabin) => cabin.id === +e.target.value)[0]
              );
            id === "hasBreakfast" && handleChange(e.target.value === "true");
          }}
        >
          {id === "cabinId" && (
            <>
              {defaultValue && (
                <option
                  className="bg-indigo-300 h-[50px] rounded-md"
                  value={defaultValue.id}
                  hidden
                >
                  {defaultValue.name}
                </option>
              )}
              <option value="" hidden>
                Wähle ein Zimmer aus...
              </option>
              {cabins.map((cabin) => (
                <option
                  className="h-[50px] rounded-md"
                  key={cabin.id}
                  value={cabin.id}
                >
                  {cabin.name}
                </option>
              ))}
            </>
          )}
          {["hasBreakfast", "isPaid"].includes(id) && (
            <>
              <option value="" hidden>
                Wähle...
              </option>
              <option value="true">Ja</option>
              <option value="false">Nein</option>
            </>
          )}
          {id === "status" && (
            <>
              <option value="" hidden>
                Wähle...
              </option>
              <option value="confirmed">Bestätigt</option>
              <option value="unconfirmed">Unbestätigt</option>
              <option value="checked-out">Ausgecheckt</option>
            </>
          )}
        </select>
      ) : (
        ""
      )}
    </>
  );
}
