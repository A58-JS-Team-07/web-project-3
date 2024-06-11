import { onValue, ref, set } from "firebase/database";
import { getAllUsersArray } from "../../../services/users.service";
import UserSnippet from "../../UserSnippet/UserSnippet";
import AddNewUserToListModal from "../AddNewUserToListModal/AddNewUserToListModal";
import { useEffect, useState, useContext } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import { db } from "../../../config/firebase-config";

function SingleContactList({ contacts, contactsList, listClicked }) {
  // console.log("CONTACTS", contacts);
  const [users, setUsers] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const getContactsFullInfo = async () => {
      setLoading(true);
      const getAllUsers = await getAllUsersArray();
      console.log("getAllUsers", getAllUsers);
      const contactsFullInfo = contacts?.map((contact) => {
        return getAllUsers.find((user) => user.username === contact);
      });

      setUsers(contactsFullInfo);
      setLoading(false);
      console.log("CONTACTS FULL INFO", contactsFullInfo);
      console.log("CONTACTS LIST", contactsList);
      console.log("Users", users);
    };

    getContactsFullInfo();
  }, [listClicked, contacts]);

  useEffect(() => {
    try {
      return onValue(ref(db, `users`), (snapshot) => {
        const usersDataFullInfo = Object.values(snapshot.val());
        console.log("snaphot.val()", snapshot.val());
        //   console.log('CONTACTS', contacts);
        console.log("usersDataFullInfo", usersDataFullInfo);
        const participants = usersDataFullInfo.filter(
          (user) =>
            user?.contactsListsParticipant &&
            user.contactsListsParticipant[contactsList?.clid] === true
        );
        console.log("participants", participants);
        setUsers(participants);
        //   console.log('usersParticipants', users);
      });
      //
    } catch (error) {
      console.error("Error in SingleContactList > useEffect:", error);
    }
  }, [listClicked, contactsList]);

  console.log("CONTACTS", contacts);

  return (
    <div className="inner__container bg-base-200 w-2/3 p-10 rounded-3xl ">
      {users.length > 0 ? (
        <div className="flex flex-col gap-6">
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
