import { useState } from "react";
import AddNewContactsList from "../AddNewContactsList/AddNewContactsList";
import Button from "../../Button/Button";

/**
 * This component is a wrapper for the AddNewContactsList component.
 * It opens the modal when the button is clicked.
 * @returns {JSX.Element}
 */

function AddNewContactsListModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-5">
      <Button onClick={() => setShowModal(!showModal)}>
        Add new list
      </Button>
      {showModal ? (
        <div>
          <AddNewContactsList showModal={showModal} setShowModal={setShowModal} />
        </div>
      ) : null}
    </div>
  );
}

export default AddNewContactsListModal;