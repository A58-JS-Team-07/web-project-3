import propsType from "prop-types";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import {
  addContactToList,
  removeContactFromList,
  isContactInList,
} from "../../services/contactsLists.services";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config.js";
import { ref, onValue } from "firebase/database";

function UserSnippet({
  user,
  contactsList = null,
  isInviting = false,
  handleDeleteInvite = () => {},
  handleInvitation = () => {},
}) {
  const [toAdd, setToAdd] = useState(true);
  const [isInList, setIsInList] = useState(false);

  const handleAddUserToList = async () => {
    setToAdd(!toAdd);
    await addContactToList(contactsList.clid, user);
    toast.success("User added to list");
  };

  const handleRemoveUserFromList = async () => {
    setToAdd(!toAdd);
    await removeContactFromList(contactsList.clid, user);
    toast.success("User removed from list");
  };

  useEffect(() => {
    const isUserInList = async () => {
      const result = await isContactInList(contactsList?.clid, user);
      console.log("isUserInList", result);
      setIsInList(result);
    };
    isUserInList();
  }, [user]);

  useEffect(() => {
    try {
      return onValue(
        ref(
          db,
          `contactsLists/${contactsList?.clid}/contacts/${user.username}`
        ),
        (snapshot) => {
          snapshot.exists() ? setIsInList(true) : setIsInList(false);
        }
      );
    } catch (error) {
      console.error("Error in UserSnippet Socket: " + error);
    }
  }, [contactsList]);

  console.log("UserSnippetContactsList", contactsList);

  return (
    <div className="event-organizer-data flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl">
      <img
        src={user?.avatar ? user.avatar : "/anonymous-avatar.jpg"}
        alt={user?.firstName + " " + user?.lastName}
        className="rounded-full w-14 h-14 object-cover flex flex-col justify-center"
      />
      <div className="event-organizer-user-info flex flex-col">
        <span className="text-lg font-semibold mb-[-3px]">
          {user?.firstName + " " + user?.lastName}
        </span>
        <span>{"@" + user?.username}</span>
        {!isInList && contactsList && (
          <div className="form-update-row flex flex-row gap-8 justify-between mt-5">
            <Button onClick={handleAddUserToList}>Add</Button>
          </div>
        )}
        {isInList && contactsList && (
          <div className="form-update-row flex flex-col gap-8 justify-between mt-5">
            <Button
              style="btn btn-outline btn-secondary"
              onClick={handleRemoveUserFromList}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

UserSnippet.propTypes = {
  user: propsType.object.isRequired,
};

export default UserSnippet;
