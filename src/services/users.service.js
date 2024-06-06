import {
  get,
  set,
  update,
  remove,
  ref,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config.js";

export const getUserByUsername = async (username) => {
  try {
    return await get(ref(db, `users/${username}`));
  } catch (error) {
    console.error("Error getting user data by username: " + error);
  }
};

export const getUserByUsernameSnapshot = async (username) => {
  try {
    const userRef = ref(db, `users/${username}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      return userSnapshot.val();
    } else {
      console.error(
        "Error in users.services > getUserSnapshot > No such user found"
      );
    }
  } catch (error) {
    console.error(
      "Error in users.services > getUserByUsernameSnapshot:",
      error
    );
    throw error;
  }
};

export const createUser = async (
  username,
  uid,
  email,
  phoneNumber,
  firstName,
  lastName
) => {
  try {
    return await set(ref(db, `users/${username}`), {
      username,
      uid,
      email,
      phoneNumber,
      firstName,
      lastName,
      canBeInvited: true,
      isAdmin: false,
      isBanned: false,
      createdOn: Date.now(),
    });
  } catch (error) {
    console.error("Error creating user: " + error);
  }
};

export const getUserData = async (uid) => {
  try {
    return await get(
      query(ref(db, "users"), orderByChild("uid"), equalTo(uid))
    );
  } catch (error) {
    console.error("Error getting user data: " + error);
  }
};

export const getAllUsersArray = async () => {
  try {
    const usersSnapshot = await get(ref(db, "users"));
    return Object.values(usersSnapshot.val());
  } catch (error) {
    console.error("Error getting all users: " + error);
  }
};

export const updateUser = async (username, updatedData) => {
  try {
    await set(ref(db, `users/${username}`), {
      ...updatedData,
      updatedOn: Date.now(),
    });
  } catch (error) {
    console.error("Error updating user:" + error);
  }
};

//USERS AND EVENTS START
export const createEventToUser = async (username, eventId) => {
  try {
    await update(ref(db, `users/${username}/createdEvents`), {
      [eventId]: true,
    });
    await update(ref(db, `users/${username}/participatingEvents`), {
      [eventId]: true,
    });
  } catch (error) {
    console.error("Error users.events > updateUserEvents:" + error);
    throw error;
  }
};

export const deleteEventFromUser = async (username, eventId) => {
  try {
    const userData = await getUserByUsernameSnapshot(username);

    if (userData.createdEvents) {
      await remove(ref(db, `users/${username}/createdEvents/${eventId}`));
    }

    if (userData.participatingEvents) {
      await remove(ref(db, `users/${username}/participatingEvents/${eventId}`));
    }

    if (userData.isInviting) {
      const invitedUsers = Object.keys(userData.isInviting[eventId]);
      console.log("DeleteEventFromUser > invitedUsers: ", invitedUsers);
      invitedUsers.forEach(async (invitedUser) => {
        await remove(
          ref(db, `users/${invitedUser}/beingInvited/${eventId}/${username}`)
        );
      });
    }
  } catch (error) {
    console.error("Error users.events > DeleteEventFromUser:" + error);
    throw error;
  }
};

//USERS AND EVENTS END

export const changeCanBeInvitedStatus = async (username, status) => {
  try {
    await set(ref(db, `users/${username}/canBeInvited`), status);
  } catch (error) {
    console.error("Error changing can be invited status:" + error);
  }
};

export const changeAdminStatus = async (username, status) => {
  try {
    await set(ref(db, `users/${username}/isAdmin`), status);
  } catch (error) {
    console.error("Error changing admin status:" + error);
  }
};

export const changeBanStatus = async (username, status) => {
  try {
    await set(ref(db, `users/${username}/isBanned`), status);
  } catch (error) {
    console.error("Error changing ban status:" + error);
  }
};

//Check if there is another way to do it
export const updateUserAvatar = async (username, avatarURL) => {
  try {
    const userRef = ref(db, `users/${username}`);
    await update(userRef, { avatar: avatarURL });
  } catch (error) {
    console.error("Error updating avatar" + error);
  }
};

export const searchUsers = async (searchQuery) => {
  try {
    const usersSnapshot = await get(ref(db, "users"));
    const users = Object.values(usersSnapshot.val());
    return users.filter((user) => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching users:" + error);
  }
};
