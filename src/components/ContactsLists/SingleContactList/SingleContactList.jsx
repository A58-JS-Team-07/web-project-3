import { useEffect, useState, useContext } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../../config/firebase-config";
import PropTypes from "prop-types";
import { getAllUsersArray } from "../../../services/users.service";
import AddNewUserToListModal from "../AddNewUserToListModal/AddNewUserToListModal";
import UserSnippet from "../../UserSnippet/UserSnippet";
import { LoaderContext } from "../../../context/LoaderContext";

/** 
 * This component displays the contacts list information.
 * @param {Array} props.contacts - List of all contacts in the specific list
 * @param {Object} props.contactsList - The contacts list object
 * @param {boolean} props.listClicked - The boolean to show or hide the list
 * @returns {JSX.Element}
 */

function SingleContactList({ contacts, contactsList, listClicked }) {
  const [users, setUsers] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const getContactsFullInfo = async () => {
      setLoading(true);
      const getAllUsers = await getAllUsersArray();
      const contactsFullInfo = contacts?.map((contact) => {
        return getAllUsers.find((user) => user.username === contact);
      });

      setUsers(contactsFullInfo);
      setLoading(false);
    };

    getContactsFullInfo();
  }, [listClicked, contacts]);

  useEffect(() => {
    try {
      return onValue(ref(db, `users`), (snapshot) => {
        const usersDataFullInfo = Object.values(snapshot.val());
        const participants = usersDataFullInfo.filter(
          (user) =>
            user?.contactsListsParticipant &&
            user.contactsListsParticipant[contactsList?.clid] === true
        );
        setUsers(participants);
      });
    } catch (error) {
      console.error("Error in SingleContactList > useEffect:", error);
    }
  }, [listClicked, contactsList]);

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

SingleContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  contactsList: PropTypes.object.isRequired,
  listClicked: PropTypes.bool.isRequired,
};

export default SingleContactList;
