import propsType from "prop-types";
import Button from "../../Button/Button";
import { deleteContactsList } from "../../../services/contactsLists.services";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase-config";
import { ref, onValue } from "firebase/database";

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

  const handleEditList = async () => {
    try {
      await deleteContactsList(contactsList?.clid, contactsList?.owner);
    } catch (error) {
      console.error("Error in ContactsLists > handleDeleteList:", error);
    };
  };

  const handleListClick = () => {
    setListClicked(!isListClicked);
    onListClick(isListClicked, contactsList?.clid);
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

  return (
    <>
      <div className="contact-list-info flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl">
        <div className="contact-list-info flex flex-col">
          <span 
          className="text-lg font-semibold mb-[-3px]"
          onClick={handleListClick}>
            {isListClicked ? "🔽" : "🔼"}
            {contactsListValue?.listName}
          </span>
        </div>
      </div>
      {/* <div>
        <Button onClick={handleEditList}>Show List</Button>
      </div> */}
      <div className="form-update-row flex gap-8 justify-between">
        <Button onClick={handleEditList}>Edit</Button>
        <Button onClick={handleDeleteList}>Delete</Button>
      </div>
    </>
  );
}

ContactsListSnippet.propTypes = {
  contactsList: propsType.object.isRequired,
};

export default ContactsListSnippet;