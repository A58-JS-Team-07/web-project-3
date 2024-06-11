import propsType from "prop-types";
import Button from "../Button/Button";
import { useEffect, useState, useContext } from "react";
import {
  addContactToList,
  removeContactFromList,
  isContactInList,
} from "../../services/contactsLists.services";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config.js";
import { ref, onValue } from "firebase/database";
import { AppContext } from "../../context/AppContext";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";

function UserSnippet({
  user,
  contactsList = null,
  handleBanUser = () => {},
  adminActions = false,
  isInviting = false,
  handleDeleteInvite = () => {},
  handleInvitation = () => {},
}) {
  const [toAdd, setToAdd] = useState(true);
  const [isInList, setIsInList] = useState(false);
  const { userData } = useContext(AppContext);

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
    <div
      className={`${
        !adminActions
          ? "user-snippet-data flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl justify-between"
          : "user-snippet-data flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl justify-between w-full"
      }`}
    >
      <div className="user-snippet-info flex flex-row gap-4 bg-base-100 py-2 px-0  rounded-xl items-center">
        <img
          src={user?.avatar ? user.avatar : "/anonymous-avatar.jpg"}
          alt={user?.firstName + " " + user?.lastName}
          className="rounded-full w-14 h-14 object-cover flex flex-col justify-center"
        />
        <div className="user-snippet-info flex flex-col">
          <span className="text-lg font-semibold mb-[-3px]">
            {user?.firstName + " " + user?.lastName}
          </span>
          <span>{"@" + user?.username}</span>
          {userData.isAdmin && adminActions && <span>{user?.email}</span>}
        </div>
      </div>
      <div className="user-snippet-actions flex flex-row gap-4 items-center">
        <div className="contact-list-actions flex flex-row gap-4">
          {!isInList && contactsList && (
            <Button onClick={handleAddUserToList}>Add</Button>
          )}
          {isInList && contactsList && (
            <Button
              style="btn btn-outline btn-secondary"
              onClick={handleRemoveUserFromList}
            >
              Remove
            </Button>
          )}
        </div>
        <div className="admin-actions flex flex-row gap-4">
          {userData.isAdmin && adminActions && (
            <div className="admin-user-actions flex justify-between gap-4">
              <Button onClick={() => handleBanUser(user)}>
                {user.isBanned ? "Unban" : "Ban"}
              </Button>
            </div>
          )}
        </div>
        {isInviting && (
          <div className="invite-to-event flex flex-row gap-4">
            <button
              onClick={() => {
                handleInvitation(user.username);
                toast.success("You've successfully invited the user.");
              }}
              className="btn rounded-full"
            >
              <IoPersonAdd className="text-green-600 text-xl " />
            </button>
            <button
              onClick={() => {
                handleDeleteInvite(user.username);
                toast.success("You've successfully removed your invitation.");
              }}
              className="btn rounded-full"
            >
              <IoPersonRemove className="text-red-500 text-xl" />
            </button>
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
