import { HiListBullet } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import TableRow from "./TableRow";

function Table() {
  return (
    <table role="table" className=" w-[100%] border rounded-lg">
      <thead>
        <tr className="grid grid-cols-5 md:grid-cols-7 text-left hyphens-manual p-3 gap-4 bg-indigo-200">
          <th className="flex items-center">Zim&shy;mer</th>
          <th className="flex items-center col-span-2">Kapa&shy;zität</th>
          <th className="flex items-center">Preis</th>
          <th className="flex items-center">Ange&shy;bote</th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
        <TableRow />
      </tbody>
    </table>
  );
}

export default Table;
