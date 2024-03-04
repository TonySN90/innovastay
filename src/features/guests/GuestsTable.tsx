import { guestsData } from "../../data/data";
import useWindowWidth from "../../hooks/UseWindowWidth";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";

function CabinsTable() {
  const windowWidth = useWindowWidth();
  return (
    <>
      <Table
        columns="grid-cols-5 md:grid-cols-10"
        columnSpace={{
          col1: "col-span-2",
          col2: "col-span-3",
          col3: "col-span-2",
          col4: "",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Gast", "Adresse", "Letzter Aufenthalt", "Insg.", "Infos"]
              : ["Gastinformationen"]
          }
        />
        <Table.Body
          data={guestsData}
          render={(guest) => (
            <GuestsRow
              guestInformation={guest}
              key={guest.id}
              windowWidth={windowWidth}
            />
          )}
        />
      </Table>
    </>
  );
}

export default CabinsTable;
