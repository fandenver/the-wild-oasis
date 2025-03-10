import Button from '../../ui/Button.jsx';
import Modal from '../../ui/Modal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Добавить новый домик</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
