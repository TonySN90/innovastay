import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { cabinsData } from "../../data/data";
import { ICabinTypes } from "../../types/cabinTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";

function CabinsTable() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <Table
        columns="grid-cols-5 md:grid-cols-7"
        columnSpace={{
          col1: "",
          col2: "col-span-2",
          col3: "",
          col4: "",
          col5: "",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Zimmer", "Kapazität", "Preis", "Angebote"]
              : ["Zimmerinformationen"]
          }
        />
        <Table.Body
          data={cabinsData}
          // data={cabinsData}
          render={(cabin: ICabinTypes) => (
            <CabinsRow
              cabins={cabin}
              key={cabin.id}
              windowWidth={windowWidth}
            />
          )}
        />
      </Table>
    </>
  );
}

export default CabinsTable;
