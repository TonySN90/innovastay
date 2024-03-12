import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateGuestForm from "./CreateGuestForm";

function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button
            type="button"
            variation="standard"
            size="lg"
            extras="rounded-lg"
            content="Neuen Gast anlegen"
          />
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
