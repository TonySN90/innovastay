import Button from "../../ui/Button";
import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { cabinsData } from "../../data/data";

function CabinsTable() {
  return (
    <>
      <Table
        columns="grid-cols-5 md:grid-cols-7"
        columnSpace={{ 1: "col-span-2" }}
      >
        <Table.Header content={["Zimmer", "Kapazität", "Preis", "Angebote"]} />
        <Table.Body
          data={cabinsData}
          render={(cabin) => <CabinsRow cabin={cabin} key={cabin.cabin} />}
        />
      </Table>
      <Button type="big" content="Zimmer hinzufügen" />
    </>
  );
}

export default CabinsTable;
