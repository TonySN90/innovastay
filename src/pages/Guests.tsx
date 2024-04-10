import Heading from "../ui/Heading";
import GuestsTable from "../features/guests/GuestsTable";
import AddGuest from "../features/guests/AddGuest";
import GuestsFilter from "../features/guests/GuestsFilter";

function Guests() {
  return (
    <>
      <Heading title="Gäste" />
      <GuestsFilter />
      <GuestsTable />
      <AddGuest />
    </>
  );
}

export default Guests;
