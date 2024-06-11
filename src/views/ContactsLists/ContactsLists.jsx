import { useState, useEffect, useContext } from "react";
import { getAllContactsListsByUser } from "../../services/contactsLists.services";
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
  const [clickedLists, setClickedLists] = useState({});

  useEffect(() => {
    if (userData && userData.contactsListsOwner) {
      const fetchContactsLists = async () => {
        try {
          const contactsListsValues = await getAllContactsListsByUser(
            userData.username
          );
          // setListClicked(!listClicked);
          // setContactsList(contactsList);
          console.log("UserData", userData.username);
          console.log("contactsListsValues", contactsListsValues);
          setContactsLists(contactsListsValues);
        } catch (error) {
          console.error("Error in ContactsLists > fetchContactsLists:", error);
        }
      };
      fetchContactsLists();
    }
  }, [userData]);

  const handleListсClick = (clid) => {
    setClickedLists((prevState) => ({
      ...prevState,
      [clid]: !prevState[clid],
    }));
  };

  useEffect(() => {
    try {
      const contactsListsRef = ref(db, `contactsLists`);
      return onValue(contactsListsRef, (snapshot) => {
        if (!snapshot.exists()) return setContactsLists([]);
        const contactsListsValues = snapshot.val();
        // console.log("Object.keys(contactsListsValues)", Object.values(contactsListsValues));
        const contactsLists = Object.values(contactsListsValues).filter(
          (contactsList) => contactsList.owner === userData.username
        );
        // console.log("contactsLists", contactsLists);
        setContactsLists(contactsLists);
        console.log("CL", contactsLists);
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
