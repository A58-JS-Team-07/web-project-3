import { useState, useEffect, useContext } from "react";
import { getAllContactsListsByUser, createContactsList } from "../../services/contactsLists.services";
import AddNewContactsListModal from "../../components/ContactsLists/AddNewContactsListModal/AddNewContactsListModal";
import { AppContext } from "../../context/AppContext";
import ContactsListSnippet from "../../components/ContactsLists/ContactsListSnippet/ContactsListSnippet";
import SingleContactList from "../../components/ContactsLists/SingleContactList/SingleContactList";
import { getContactsFromList } from "../../services/contactsLists.services";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../config/firebase-config";

function ContactsLists() {
  const { userData } = useContext(AppContext);
  const [contacts, setContacts] = useState(null);
  const [contactsLists, setContactsLists] = useState([]);
  const [listClicked, setListClicked] = useState(false);
  const [contactsList, setContactsList] = useState(null);

  useEffect(() => {
    const fetchContactsLists = async () => {
      try {
        const contactsListsValues = await getAllContactsListsByUser(userData.username);
        // setListClicked(!listClicked);
        setContactsList(contactsList);
        console.log("contactsListsValues",contactsListsValues);
        setContactsLists(contactsListsValues);
      } catch (error) {
        console.error("Error in ContactsLists > fetchContactsLists:", error);
      }
    };

    fetchContactsLists();
  }, []);

  useEffect(() => {
    try {
      const contactsListsRef = ref(db, `contactsLists`);
      return onValue(contactsListsRef, (snapshot) => {
        const contactsListsValues = snapshot.val();
        const contactsLists = Object.values(contactsListsValues)
          .filter((contactsList) => contactsList.owner === userData.username)
          .map((contactsList) => { contactsList.clid = contactsList.id; return contactsList.listName; });
        console.log("contactsLists", contactsLists);
        setContactsLists(contactsLists);
        console.log("CL", contactsLists);
      });

    } catch (error) {
      console.error("Error in ContactsLists > useEffect:", error);
    }
    
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // console.log("contactsList?.clid", contactsList);
        const contactsValues = await getContactsFromList(contactsList?.clid);
        // console.log('CONTACTS LIST', contactsList);
        // console.log('CONTACTS VALUES', contactsValues);
        setContacts(contactsValues);
        // console.log("contacts", contacts);
        setContactsList(contactsList);
        console.log("contactsList", contactsList);
      } catch (error) {
        console.error("Error in Contacts > fetchContacts:", error);
      }
    };

    fetchContacts();
  }, [listClicked]);

  const handleListClick = (contactsList) => {
    // console.log("List Clicked1", listClicked);
    setListClicked(!listClicked);
    setContactsList(contactsList);
    // console.log("List", contactsList);
    console.log("List Clicked2", listClicked);
  };

  // console.log("ContactsList", contactsList);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 p-6">Contacts Lists</h1>
      <div className="flex gap-10 p-6">
        <div className="inner__container bg-base-200 w-1/3 min-w-1/2 p-10 rounded-3xl ">
          {contactsLists?.length > 0 ? (
            <div className="flex flex-col gap-10">
              {contactsLists.map((contactsList) => (
                <ContactsListSnippet
                  key={contactsList?.clid}
                  contactsList={contactsList}
                  onListClick={() => handleListClick(contactsList)}
                />
              ))}
            </div>
          ) : (
            <div className="text-xl">
              <p>No contacts lists found</p>
            </div>
          )}
          <AddNewContactsListModal />
        </div>
        {listClicked && (
          <SingleContactList contacts={contacts} contactsList={contactsList} listClicked={listClicked} />
        )}
      </div>
    </div>
  );
}

export default ContactsLists;