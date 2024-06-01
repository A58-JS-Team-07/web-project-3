import propsType from "prop-types";
import Button from "../../Button/Button";
import { deleteContactsList } from "../../../services/contactsLists.services";


function ContactsListSnippet({ contactsList }) {

  const handleDeleteList = async () => {
    try {
      await deleteContactsList(contactsList?.clid, contactsList?.owner);
    } catch (error) {
      console.error("Error in ContactsLists > handleDeleteList:", error);
    };
  };
  return (
    <>
      <div className="contact-list-info flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl">
        <div className="contact-list-info flex flex-col">
          <span className="text-lg font-semibold mb-[-3px]">
            {contactsList?.listName}
          </span>
        </div>
      </div>
      <div className="form-update-row flex gap-8 justify-between">
        <Button >Edit</Button>
        <Button  onClick={handleDeleteList}>Delete</Button>
      </div>
    </>
  );
}

ContactsListSnippet.propTypes = {
  contactsList: propsType.object.isRequired,
};

export default ContactsListSnippet;