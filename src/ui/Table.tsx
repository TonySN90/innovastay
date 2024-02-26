import data from "../data/data";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Button from "./Button";

function Table() {
  return (
    <>
      <table className=" w-[100%] rounded mb-4">
        <TableHeader />
        <tbody>
          {data.map((cabin) => (
            <TableRow cabin={cabin} key={cabin.cabin} />
          ))}
        </tbody>
      </table>
      <Button type="big" />
    </>
  );
}

export default Table;
