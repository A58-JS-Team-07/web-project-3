import { useState, useEffect } from "react";
import { useContext } from "react";
import { getAllContactsListsByUser, createContactsList } from "../../services/contactsLists.services";
import AddNewContactsListModal from "../../components/ContactsLists/AddNewContactsListModal/AddNewContactsListModal";
import { AppContext } from "../../context/AppContext";
import ContactsListSnippet from "../../components/ContactsLists/ContactsListSnippet/ContactsListSnippet";

function ContactsLists() {
  const { userData } = useContext(AppContext);
  const [contacts, setContacts] = useState(null);
  const [contactsLists, setContactsLists] = useState([]);

  useEffect(() => {
    const fetchContactsLists = async () => {
      try {
        const contactsListsValues = await getAllContactsListsByUser(userData.username);
        console.log(contactsListsValues);
        setContactsLists(contactsListsValues);
      } catch (error) {
        console.error("Error in ContactsLists > fetchContactsLists:", error);
      }
    };

    fetchContactsLists();
  }, []);

  // const getAllContactsLists = () => {
  //   const contactsListsRef = ref(db, "contactsLists");

  //   return onValue(contactsListsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const contactsLists = data ? Object.keys(data).map((key) => ({ clid: key, ...data[key] })) : [];
  //     setContactsLists(contactsLists);
  //   });
  // };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-5">Contacts Lists</h1>
        <div className="inner__container bg-base-200 w-1/3 min-w-1/2 p-10 rounded-3xl ">
          {contactsLists?.length > 0 ? (
            <div className="flex flex-col gap-10">
              {contactsLists.map((contactsList) => (
                <ContactsListSnippet key={contactsList?.clid} contactsList={contactsList} />
              ))}
            </div>
          ) : (
            <div className="text-xl">
              <p>No contacts lists found</p>
            </div>
          )}
          <AddNewContactsListModal />
        </div>
      </div>
    </div>
  );
}

export default ContactsLists;