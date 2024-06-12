import { useState } from "react";
import AddNewUserToListFrom from "../AddNewUserToListForm/AddNewUserToListForm";
import PropTypes from "prop-types";
import Button from "../../Button/Button";

/**
 * This component is a wrapper for the AddNewUserToListFrom component.
 * @param {Object} props.contactsList - The contacts list object
 * @returns {JSX.Element}
	*/
function AddNewUserToListModal({ contactsList }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-5">
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

AddNewUserToListModal.PropTypes = {
  contactsList: PropTypes.object.isRequired,
};