import { onValue, ref, set } from "firebase/database";
import { getAllUsersArray } from "../../../services/users.service";
import UserSnippet from "../../UserSnippet/UserSnippet";
import AddNewUserToListModal from "../AddNewUserToListModal/AddNewUserToListModal";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import { db } from "../../../config/firebase-config";

function SingleContactList({ contacts, contactsList, listClicked }) {
  console.log("CONTACTS", contacts);
  const [users, setUsers] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const getContactsFullInfo = async () => {
      setLoading(true);
      const getAllUsers = await getAllUsersArray();
      console.log("getAllUsers", getAllUsers);
      const contactsFullInfo = contacts.map((contact) => {
        return getAllUsers.find((user) => user.username === contact);
      });

      setUsers(contactsFullInfo);
      setLoading(false);
      console.log("CONTACTS FULL INFO", contactsFullInfo);
      console.log("USERS", users);
      console.log("CONTACTS LIST", contactsList);
    };

    getContactsFullInfo();
  }, [listClicked]);

    useEffect(() => {
        return onValue(ref(db, `contactsLists/${contactsList.clid}/contacts`), (snapshot) => {
            const data = snapshot.val();
            console.log('DATA', data);
            
        });

    }, [contacts, contactsList]);

    // useEffect(() => {
    //     return onValue(ref(db, `contactsLists/${contactsList.clid}/contacts`), (snapshot) => {
    //         const getContactsFullInfo = async () => {
    //             const getAllUsers = await getAllUsersArray();
    //             console.log('getAllUsers', getAllUsers);
    //             const contactsFullInfo = contacts.map((contact) => {
    //                 return getAllUsers.find((user) => user.username === contact);
    //             });

    //             setUsers(contactsFullInfo);
    //         }
    //         getContactsFullInfo();
    //     });

    // }, [contacts, contactsList]);

  // useEffect(() => {
  //     return onValue(ref(db, `contactsLists/${contactsList.clid}/contacts`), (snapshot) => {
  //         const data = snapshot.val();
  //         const contacts = data ? Object.keys(data).map((key) => ({ username: key, ...data[key] })) : [];
  //         setUsers(contacts);
  //     });
  // }, [contacts]);

  // useEffect(() => {
  //     try {
  //         return onValue(ref(db, `contactsLists/${contactsList.clid}/contacts`), (snapshot) => {
  //             const data = snapshot.val();
  //             const contacts = data ? Object.keys(data).map((key) => ({ username: key, ...data[key] })) : [];
  //             setUsers(contacts);
  //         });
  //     } catch (error) {
  //         console.error("Error in SingleContactList Socket: " + error);
  //     }
  // }, [contactsList]);

  return (
    <div className="inner__container bg-base-200 w-1/3 min-w-1/2 p-10 rounded-3xl">
      {users.length > 0 ? (
        <div className="flex flex-col gap-10">
          {users.map((user) => (
            <UserSnippet
              key={user.uid}
              user={user}
              contactsList={contactsList}
            />
          ))}
        </div>
      ) : (
        <div className="text-xl">
          <p>No contacts found</p>
        </div>
      )}
      <AddNewUserToListModal contactsList={contactsList} />
    </div>
  );
}

export default SingleContactList;
