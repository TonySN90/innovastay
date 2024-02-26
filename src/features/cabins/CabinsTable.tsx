import Button from "../../ui/Button";
import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";

function CabinsTable() {
  return (
    <>
      <Table>
        <Table.Header
          content={["Zimmer", "Kapazität", "Preis", "Angebote"]}
          specialStyles={{ 1: "col-span-2" }}
        />
        <Table.Body
          render={(cabin) => <CabinsRow cabin={cabin} key={cabin.cabin} />}
        />
      </Table>
      <Button type="big" content="Zimmer hinzufügen" />
    </>
  );
}

export default CabinsTable;
