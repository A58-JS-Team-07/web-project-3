import Button from "../../Button/Button";
import { useState } from "react";
import AddNewContactsList from "../AddNewContactsList/AddNewContactsList";
function CreateEventModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-5">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
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

export default CreateEventModal;

