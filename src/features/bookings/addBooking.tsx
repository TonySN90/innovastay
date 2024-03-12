import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button
            type="button"
            variation="standard"
            size="lg"
            extras="rounded-lg"
            content="Neue Buchung anlegen"
          />
          {/* Guest and Cabins mit vorab geladen werden */}
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
