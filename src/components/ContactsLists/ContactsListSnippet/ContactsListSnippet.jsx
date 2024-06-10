import propsType from "prop-types";
import { deleteContactsList } from "../../../services/contactsLists.services";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../config/firebase-config";
import { ref, onValue } from "firebase/database";
import { IoList } from "react-icons/io5";

function ContactsListSnippet({ contactsList, onListClick }) {
  const [isListClicked, setListClicked] = useState(false);
  const [contactsListValue, setContactsListValue] = useState(null);

  const handleDeleteList = async () => {
    try {
      await deleteContactsList(contactsList?.clid, contactsList?.owner);
      console.log("CONTACT LIST", contactsList);
    } catch (error) {
      console.error("Error in ContactsLists > handleDeleteList:", error);
    };
  };

  const handleListsClick = () => {
    onListClick(contactsList?.clid);
  };

  useEffect(() => {
    try {
      return onValue(ref(db, `contactsLists/${contactsList.clid}`), (snapshot) => {
        const contactsListValues = snapshot.val();
        setContactsListValue(contactsListValues);
        console.log('ContactsListSnippet', contactsList);
      });
    } catch (error) {
      console.error("Error in ContactsLists > useEffect:", error);
    }
  }, []);

  console.log('ContactsListSnippet', contactsList);

  return (
    <>
      <div className="contact-list-info flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl">
        <div className="contact-list-info flex flex-col">
          <span className="text-lg font-semibold mb-[-3px]" >
            <IoList className="fill-secondary text-secondary w-5 h-5 inline-block mr-2" />
            {contactsListValue?.listName}
          </span>
        </div>
      </div>
      <div className="contact-list-delete-show flex justify-end gap-4">
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
    </>
  );
}

ContactsListSnippet.propTypes = {
  contactsList: propsType.object.isRequired,
};

export default ContactsListSnippet;