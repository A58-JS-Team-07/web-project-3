import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { deleteContactsList } from "../../../services/contactsLists.services";
import PropsType from "prop-types";
import { IoList } from "react-icons/io5";

/**
 * This component displays the contacts list name. 
 * And provides the user with the option to delete the list.
 * @param {Object} props.contactsList - The contacts list object
 * @param {function} props.onListClick - The function to be executed when the list is clicked 
 * @returns {JSX.Element}
 */

function ContactsListSnippet({ contactsList, onListClick }) {
  const [contactsListValue, setContactsListValue] = useState(null);

  const handleDeleteList = async () => {
    try {
      await deleteContactsList(contactsList?.clid, contactsList?.owner);
    } catch (error) {
      console.error("Error in ContactsLists > handleDeleteList:", error);
    }
  };

  const handleListsClick = () => {
    onListClick(contactsList?.clid);
  };

  useEffect(() => {
    try {
      return onValue(
        ref(db, `contactsLists/${contactsList.clid}`),
        (snapshot) => {
          const contactsListValues = snapshot.val();
          setContactsListValue(contactsListValues);
        }
      );
    } catch (error) {
      console.error("Error in ContactsLists > useEffect:", error);
    }
  }, []);

  return (
    <>
      <div className="contact-list-info flex flex-row gap- bg-base-100 px-4 py-3 rounded-xl w-full">
        <div className="contact-list-info flex flex-row items-center justify-between w-full">
          <div className="text-lg flex flex-row items-center font-semibold mb-[-3px]">
            <IoList className="fill-secondary text-secondary w-5 h-5 inline-block mr-2" />
            {contactsListValue?.listName}
          </div>
          <div className="contact-list-delete-show flex flex-row gap-4 mt-[2px]">
            <div className="form-update-row flex gap-8 justify-between">
              <span
                onClick={handleListsClick}
                className="text-black-500 underline hover:no-underline cursor-pointer"
              >
                Show List
              </span>
            </div>
            <div className="form-update-row flex gap-8 justify-between">
              <span
                onClick={handleDeleteList}
                className="text-red-500 underline hover:no-underline cursor-pointer"
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ContactsListSnippet.propTypes = {
  contactsList: PropsType.object.isRequired,
  onListClick: PropsType.func.isRequired,
};

export default ContactsListSnippet;
