import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form" />
        <Modal.Window name="cabin-form">
          <CreateCabinForm onCloseModal={close} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
