import { useContext, useEffect, useState } from "react";
import { getAllUsersArray } from "../../../../services/users.service";
import UserSnippet from "../../../UserSnippet/UserSnippet";
import {
  inviteUsers,
  deleteInvite,
} from "../../../../services/invites.service";
import { AppContext } from "../../../../context/AppContext";

function EventContactsWindow({ contactsUsernames, invitingUsername, eventId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      getAllUsersArray().then((res) => {
        console.log("res", res);
        console.log("contactsUsernames", contactsUsernames);
        const filteredUsers = res.filter((user) => {
          return contactsUsernames.includes(user.username);
        });
        console.log("filteredUsers", filteredUsers);
        setUsers(filteredUsers);
      });
    } catch (error) {
      console.error("Error in EventContactsWindow.jsx > UseEffect " + error);
      throw error;
    }
  }, [contactsUsernames]);

  async function handleInvitation(invitedUser) {
    return await inviteUsers(eventId, invitingUsername, invitedUser);
  }

  function handleDeleteInvite(invitedUser) {
    deleteInvite(eventId, invitingUsername, invitedUser);
  }

  return (
    <div className="users-to-invite flex flex-col gap-4">
      {users.map((user) => {
        return (
          <UserSnippet
            key={user.username}
            user={user}
            handleInvitation={handleInvitation}
            handleDeleteInvite={handleDeleteInvite}
            isInviting={true}
          />
        );
      })}
    </div>
  );
}

export default EventContactsWindow;
