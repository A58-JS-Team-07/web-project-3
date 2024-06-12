import { useEffect, useState } from "react";
import { getAllUsersArray } from "../../../../services/users.service";
import UserSnippet from "../../../UserSnippet/UserSnippet";
import {
  inviteUsers,
  deleteInvite,
} from "../../../../services/invites.service";
import PropTypes from "prop-types";

/**
 * EventContactsWindow component is used to display the contacts of the user.
 *
 * @param {object} contactsUsernames - The usernames of the contacts.
 * @param {string} invitingUsername - The username inviter to the event.
 * @param {string} eventId - The event ID.
 * @returns - The JSX element for EventContactsWindow component.
 */

function EventContactsWindow({ contactsUsernames, invitingUsername, eventId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      getAllUsersArray().then((res) => {
        const filteredUsers = res.filter((user) => {
          return contactsUsernames.includes(user.username);
        });

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

EventContactsWindow.propTypes = {
  contactsUsernames: PropTypes.array.isRequired,
  invitingUsername: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default EventContactsWindow;
