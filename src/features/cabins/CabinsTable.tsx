import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { ICabinTypes } from "../../types/cabinTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";
import useCabins from "./useCabins";
import Empty from "../../ui/Empty";
import { StatusTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";

function CabinsTable() {
  const windowWidth = useWindowWidth();
  const { cabins, loadingStatus } = useCabins();

  if (loadingStatus === StatusTypes.LOADING) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

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
          data={cabins}
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
