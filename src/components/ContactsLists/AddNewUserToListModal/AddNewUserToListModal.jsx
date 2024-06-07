import Button from "../../Button/Button";
import { useState } from "react";
import AddNewUserToListFrom from "../AddNewUserToListForm/AddNewUserToListForm";
function AddNewUserToListModal({ contactsList }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-5">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <Button onClick={() => setShowModal(!showModal)}>
        Add Contact
      </Button>

      {showModal ? (
        <div>
          <AddNewUserToListFrom showModal={showModal} setShowModal={setShowModal} contactsList={contactsList} />
        </div>
      ) : null}
    </div>
  );
}

export default AddNewUserToListModal;