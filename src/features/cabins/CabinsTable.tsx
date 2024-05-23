import Table from "../../ui/Table";
import CabinsRow from "./CabinsRow";
import { ICabinTypes } from "../../types/cabinTypes";
import useWindowWidth from "../../hooks/UseWindowWidth";
import useCabins from "./hooks/useCabins";
import Empty from "../../ui/Empty";
import { LoadingTypes } from "../../types/GlobalTypes";
import Spinner from "../../ui/Spinner";
import Menu from "../../ui/Menu";
import Pagination from "../../ui/Pagination";
import { useAppSelector } from "../../store";

function CabinsTable() {
  const windowWidth = useWindowWidth();
  const { cabins, loadingStatus } = useCabins();
  const { count } = useAppSelector((state) => state.cabins);

  if (loadingStatus === LoadingTypes.LOADING) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menu>
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
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menu>
  );
}

export default CabinsTable;
