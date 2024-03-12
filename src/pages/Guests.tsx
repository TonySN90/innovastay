import Heading from "../ui/Heading";
import GuestsTable from "../features/guests/GuestsTable";
import AddGuest from "../features/guests/AddGuest";

function Guests() {
  return (
    <>
      <Heading title="Gäste" />
      <GuestsTable />
      <AddGuest />
    </>
  );
}

export default Guests;
