import { FormValues, IFormRowProps, IInputProps } from "../types/FormTypes";

function FormRow<T extends keyof FormValues>({
  label,
  id,
  registerProp,
  error,
  type,
  isUploading,
  cabins,
  onChange,
}: IFormRowProps<T>) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-4 justify-between md:items-center">
      <Label label={label} />
      {error && (
        <span className="text-red-500 text-md md:max-w-[220px]">{error}</span>
      )}
      <Input
        cabins={cabins}
        id={id}
        type={type}
        reg={registerProp}
        isUploading={isUploading}
        onChange={onChange}
      />
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

function Input<T extends keyof FormValues>({
  id,
  reg,
  type,
  isUploading,
  cabins,
  onChange,
}: IInputProps<T>) {
  const { register, required, minLength, pattern, validate } = reg;

  return (
    <div>
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
            pattern: pattern,
            validate: validate,
          })}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        ""
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
          name="cabin"
          id="cabin"
          className="md:w-[300px] h-9 border border-gray-300 text-gray-500 px-2 rounded-lg"
          disabled={isUploading}
          {...register(id, {
            required: required,
            min: minLength,
          })}
          onChange={(e) => {
            id === "cabinId" &&
              onChange(
                cabins.filter((cabin) => cabin.id === +e.target.value)[0]
              );
            id === "hasBreakfast" && onChange(e.target.value === "true");
          }}
        >
          {id === "cabinId" && (
            <>
              <option value="" hidden>
                Wähle ein Zimmer aus...
              </option>
              {cabins.map((cabin) => (
                <option key={cabin.id} value={cabin.id}>
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
    </div>
  );
}
