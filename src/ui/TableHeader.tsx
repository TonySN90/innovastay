function TableHeader() {
  const thStyles = "flex items-center font-semibold uppercase text-gray-700";

  return (
    <thead>
      <tr className="grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual p-3 gap-4 bg-indigo-200">
        <th className={thStyles}>Zim&shy;mer</th>
        <th className={`${thStyles} col-span-2`}>Kapa&shy;zität</th>
        <th className={thStyles}>Preis</th>
        <th className={thStyles}>Ange&shy;bote</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
