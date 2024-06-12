import { useEffect, useState } from "react";
import { getAllContactsListsByUser } from "../../../services/contactsLists.services";
import EventContactListSnippet from "./EventContactListSnippet/EventContactListSnippet";
import { IoClose } from "react-icons/io5";
import EventContactsWindow from "./EventContactsWindow/EventContactsWindow";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * InviteToEvent component is used to invite users to the event.
 *
 * @param {string} eventId - The event ID.
 * @param {string} invitingUsername - The username of the user inviting to the event.
 * @param {boolean} invitingModal - The state of the inviting modal.
 * @param {function} setInvitingModal - The function to set the inviting modal state.
 * @returns - The JSX element for InviteToEvent component.
 */

function InviteToEvent({
  eventId,
  invitingUsername,
  invitingModal,
  setInvitingModal,
}) {
  const [contactLists, setContactLists] = useState([]);
  const [contactsUsernames, setContactsUsernames] = useState([]);

  useEffect(() => {
    try {
      getAllContactsListsByUser(invitingUsername).then((res) => {
        setContactLists(res);
      });
    } catch (error) {
      console.error(
        "Error in EventContactListSnippet.jsx > UseEffect " + error
      );
      throw error;
    }
  }, []);

  function handleContactListClick(clid) {
    try {
      const contacts = contactLists.find(
        (contactList) => contactList.clid === clid
      ).contacts;

      if (contacts === undefined) {
        setContactsUsernames([]);
        toast.error(
          `No contacts in this list. Go to "Contacts Lists" and add some contacts first.`
        );
        return;
      }
      const usernames = Object.keys(contacts);

      if (
        usernames.length === contactsUsernames.length &&
        usernames.every((value, index) => value === contactsUsernames[index])
      ) {
        setContactsUsernames([]);
      } else {
        setContactsUsernames(usernames);
      }
    } catch (error) {
      console.error(
        "Error in EventContactListSnippet.jsx > handleContactListClick " + error
      );
      throw error;
    }
  }

  return (
    <div>
      {invitingModal && (
        <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-full w-full min-w-full min-h-full bg-black z-10 bg-opacity-60  ">
          <div className="create-event-modal m-8 rounded-2xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[60%] min-h-[70%] max-h-[70%] overflow-auto max-w-7xl z-10 px-8 py-7 flex flex-col h-full">
            <button
              onClick={() => {
                setInvitingModal(false);
              }}
              className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-5"
            >
              <IoClose />
            </button>
            <h2 className="text-3xl font-bold mb-8">
              Invite users to the event
            </h2>
            <div className="flex flex-row flex-grow gap-8">
              <div className="contact-lists flex flex-col gap-4 border px-4 py-5 rounded-2xl overflow-auto w-2/5">
                <span className="font-semibold text-lg">
                  Choose contact list:
                </span>
                {contactLists.map((contactList) => {
                  return (
                    <EventContactListSnippet
                      key={contactList.clid}
                      contactList={contactList}
                      handleContactListClick={handleContactListClick}
                    />
                  );
                })}
              </div>
              {contactsUsernames.length !== 0 && (
                <div className="contacts-window flex flex-col gap-4 border px-4 py-5 rounded-2xl overflow-auto w-3/5">
                  <span className="font-semibold text-lg">
                    Invite users from the list:
                  </span>
                  <EventContactsWindow
                    contactsUsernames={contactsUsernames}
                    invitingUsername={invitingUsername}
                    eventId={eventId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

InviteToEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  invitingUsername: PropTypes.string.isRequired,
  invitingModal: PropTypes.bool.isRequired,
  setInvitingModal: PropTypes.func.isRequired,
};

export default InviteToEvent;
