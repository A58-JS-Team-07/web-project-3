import { useState } from 'react';
import { useContext } from 'react';
import Button from '../../Button/Button';
import { IoClose } from 'react-icons/io5';
import { AppContext } from '../../../context/AppContext';
import { createContactsList } from '../../../services/contactsLists.services';
import { toast } from 'react-toastify';
import { MIN_CONTACT_LIST_NAME_LENGTH, MAX_CONTACT_LIST_NAME_LENGTH } from '../../../common/constants';

function AddNewContactsListForm({ showModal, setShowModal = () => { } }) {
  const { userData } = useContext(AppContext);
  const [newContactsListName, setNewContactsListName] = useState('');

  const handleChange = (event) => {
    setNewContactsListName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!newContactsListName) {
      toast.error('Please enter a name for the new contacts list!');
      return;
    }

    if (newContactsListName.length < MIN_CONTACT_LIST_NAME_LENGTH) {
      toast.error('Contacts list name should be at least 3 characters long!');
      return;
    }

    if (newContactsListName.length > MAX_CONTACT_LIST_NAME_LENGTH) {
      toast.error('Contacts list name should be at most 30 characters long!');
      return;
    }


    await createContactsList(userData.username, newContactsListName);
    setNewContactsListName('');
    setShowModal(false);
  };

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div>
      {showModal ? (
        <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  min-w-full min-h-full bg-black z-10 bg-opacity-60 ">
          <div className="create-event-modal m-8 rounded-2xl rounded-2xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[30%] min-h-[30%] max-h-[80%] overflow-auto max-w-7xl z-10 px-8 py-7">
            <h2 className="text-3xl font-bold mb-5">Create List</h2>
            <button
              className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-6"
              onClick={closeModal}
            >
              <IoClose />
            </button>
            <label className="input input-bordered flex mb-8 grow items-center gap-2 max-w-[400px]">
            <input className="grow"
              type="text"
              value={newContactsListName}
              onChange={handleChange}
              placeholder="Enter new contacts list name"
            />
            </label>
            <div className="form-update-row flex gap-8 justify-between mt-5">
              <Button onClick={handleSubmit}>Create list</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddNewContactsListForm;