import useWindowWidth from "../../hooks/UseWindowWidth";
import { StatusTypes } from "../../types/GlobalTypes";
import Empty from "../../ui/Empty";
import Menu from "../../ui/Menu";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";
import useGuests from "./useGuests";

function CabinsTable() {
  const windowWidth = useWindowWidth();
  const { guests, loadingStatus } = useGuests();

  if (loadingStatus === StatusTypes.LOADING) return <Spinner />;

  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menu>
      <Table
        columns="grid-cols-5 md:grid-cols-10"
        columnSpace={{
          col1: "col-span-2",
          col2: "col-span-3",
          col3: "col-span-2",
          col4: "",
          col5: "",
        }}
      >
        <Table.Header
          content={
            windowWidth > 768
              ? ["Gast", "Adresse", "Gast seit", "Insg.", "Infos"]
              : ["Gastinformationen"]
          }
        />
        <Table.Body
          data={guests}
          render={(guest) => (
            <GuestsRow guest={guest} key={guest.id} windowWidth={windowWidth} />
          )}
        />
      </Table>
    </Menu>
  );
}

export default CabinsTable;
