import { useState, useEffect, useContext } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase-config";
import { getAllContactsListsByUser } from "../../services/contactsLists.services";
import { AppContext } from "../../context/AppContext";
import AddNewContactsListModal from "../../components/ContactsLists/AddNewContactsListModal/AddNewContactsListModal";
import ContactsListSnippet from "../../components/ContactsLists/ContactsListSnippet/ContactsListSnippet";
import SingleContactList from "../../components/ContactsLists/SingleContactList/SingleContactList";
import { getContactsFromList } from "../../services/contactsLists.services";

/**
 * This component displays the page with all the contacts lists of the user.
 * @returns {JSX.Element}
 */

function ContactsLists() {
  const { userData } = useContext(AppContext);
  const [contacts, setContacts] = useState(null);
  const [contactsLists, setContactsLists] = useState([]);
  const [listClicked, setListClicked] = useState(false);
  const [contactsList, setContactsList] = useState(null);
  const [clickedLists, setClickedLists] = useState({});

  useEffect(() => {
    if (userData && userData.contactsListsOwner) {
      const fetchContactsLists = async () => {
        try {
          const contactsListsValues = await getAllContactsListsByUser(
            userData.username
          );
          setContactsLists(contactsListsValues);
        } catch (error) {
          console.error("Error in ContactsLists > fetchContactsLists:", error);
        }
      };
      fetchContactsLists();
    }
  }, [userData]);

  useEffect(() => {
    try {
      const contactsListsRef = ref(db, `contactsLists`);
      return onValue(contactsListsRef, (snapshot) => {
        if (!snapshot.exists()) return setContactsLists([]);
        const contactsListsValues = snapshot.val();
        const contactsLists = Object.values(contactsListsValues).filter(
          (contactsList) => contactsList.owner === userData?.username
        );
        setContactsLists(contactsLists);
      });
    } catch (error) {
      console.error("Error in ContactsLists > useEffect:", error);
    }
  }, [userData]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsValues = await getContactsFromList(contactsList?.clid);
        setContacts(contactsValues);
        setContactsList(contactsList);
      } catch (error) {
        console.error("Error in Contacts > fetchContacts:", error);
      }
    };

    fetchContacts();
  }, [listClicked]);

  const handleListClick = (contactsList) => {
    setListClicked(!listClicked);
    setContactsList(contactsList);
  };

  return (
    <div className="min-h-[92%]">
      <h1 className="contacts-lists-page text-3xl font-bold p-6">
        Contacts Lists
      </h1>
      <div className="flex flex-row w-full h-full gap-10 px-6 pb-6">
        <div className="inner-container bg-base-200 w-1/3 min-w-1/2 p-10 rounded-3xl">
          {contactsLists?.length > 0 ? (
            <div className="flex flex-col gap-6">
              {contactsLists.map((contactsList) => (
                <ContactsListSnippet
                  key={contactsList?.clid}
                  contactsList={contactsList}
                  onListClick={() => handleListClick(contactsList)}
                  isListClicked={clickedLists[contactsList?.clid]}
                />
              ))}
            </div>
          ) : (
            <div className="text-xl">
              <p>No contacts lists found</p>
            </div>
          )}
          <div className="mt-8">
            <AddNewContactsListModal />
          </div>
        </div>
        {listClicked && (
          <SingleContactList
            contacts={contacts}
            contactsList={contactsList}
            listClicked={listClicked}
          />
        )}
      </div>
    </div>
  );
}

export default ContactsLists;
