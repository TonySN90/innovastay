import AddCabin from "../features/cabins/AddCabin";
import CabinsTable from "../features/cabins/CabinsTable";
import Heading from "../ui/Heading";

function Cabins() {
  return (
    <>
      <Heading title="Zimmer" />
      <CabinsTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
