import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { cabinsData } from "../../data/data";
import { ICabinTypes } from "../../types/cabinTypes";

function CabinsTable() {
  return (
    <>
      <Table
        columns="grid-cols-5 md:grid-cols-7"
        columnSpace={{
          col1: "col-span-2",
          col2: "",
          col3: "",
        }}
      >
        <Table.Header content={["Zimmer", "Kapazität", "Preis", "Angebote"]} />
        <Table.Body
          data={cabinsData}
          render={(cabin: ICabinTypes) => (
            <CabinsRow cabins={cabin} key={cabin.cabin} />
          )}
        />
      </Table>
    </>
  );
}

export default CabinsTable;
