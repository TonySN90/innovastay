function FormRow({
  children,
  label,
  error,
  id,
}: {
  children: React.ReactNode;
  label: string;
  // error: FieldErrors<FormValues>;
  error: { [key: string]: { message: string } } | undefined;
  id: string;
}) {
  return (
    <div className="border-b-2 border-indigo-100 md:min-w-[680px] transition-all flex flex-col md:flex-row py-3 justify-between md:items-center">
      {/* LABEL */}
      <label className="w-full md:w-[160px]" htmlFor={id}>
        {label}
      </label>

      {/* ERROR */}
      {error && (
        <span className="text-red-500 text-md w-[160px] md:max-w-[220px]">
          {error[id]?.message}
        </span>
      )}

      {/* Input */}
      {children}
    </div>
  );
}

export default FormRow;
