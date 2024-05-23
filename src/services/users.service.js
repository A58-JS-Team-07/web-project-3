import { get, set, update, ref, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config.js';

export const getUserByUsername = async (username) => {

    return await get(ref(db, `users/${username}`));
};

export const createUser = async (username, uid, email, phoneNumber, firstName, lastName, address, avatar) => {
    try {
        return await set(ref(db, `users/${username}`), {
            username,
            uid,
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            avatar, // Check how to do it???
            canBeInvited: false,
            isAdmin: false,
            isBanned: false,
            createdOn: Date.now()
        });
    } catch (error) {
        throw new Error('Error creating user: ' + error);
    }
};

export const getUserData = async (uid) => {
    try {
        return await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
    } catch (error) {
        throw new Error('Error getting user data: ' + error);
    }
};

export const getAllUsersArray = async () => {
    try {
        const usersSnapshot = await get(ref(db, 'users'));
        return Object.values(usersSnapshot.val());
    } catch (error) {
        throw new Error('Error getting all users: ' + error);
    }
};

export const updateUser = async (username, updatedData) => {

    return await set(ref(db, `users/${username}`), { ...updatedData, updatedOn: Date.now()});
};

export const changeCanBeInvitedStatus = async (username, status) => {

    return await set(ref(db, `users/${username}/canBeInvited`), status);
};

export const changeAdminStatus = async (username, status) => {

    return await set(ref(db, `users/${username}/isAdmin`), status)
};

export const changeBanStatus = async (username, status) => {

    return await set(ref(db, `users/${username}/isBanned`), status);
};

//Check if there is another way to do it
export const updateUserAvatar = async (username, avatarURL) => {
    const changeAvatar = {};
    changeAvatar[`users/${username}/avatarURL`] = avatarURL;

    return await update(ref(db), changeAvatar);
};

//Test these 3 functions to see if they work as expected
export const addUserCreatedEvent = async (username, eid) => {
  
    return await set(ref(db, `users/${username}/createdEvents/${eid}`));
};

export const addUserInvitedEvent = async (username, eid) => {
  
    return await set(ref(db, `users/${username}/invitedEvents/${eid}`));
};

export const addUserParticipatedEvent = async (username, eid) => {
  
    return await set(ref(db, `users/${username}/participatedEvents/${eid}`));
};