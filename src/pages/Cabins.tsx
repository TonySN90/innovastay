import AddCabin from "../features/cabins/AddCabin";
import CabinsFilter from "../features/cabins/CabinsFilter";
import CabinsTable from "../features/cabins/CabinsTable";
import Heading from "../ui/Heading";

function Cabins() {
  return (
    <>
      <Heading title="Zimmer" size="2text-xl sm:text-3xl" />
      <CabinsFilter />
      <CabinsTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
