import { get, set, update, ref, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config.js';

export const getUserByUsername = async (username) => {
    try {
        return await get(ref(db, `users/${username}`));
    } catch (error) {
        throw new Error('Error getting user data by username: ' + error)
    }
};

export const createUser = async (username, uid, email, phoneNumber, firstName, lastName, address) => {
    try {
        return await set(ref(db, `users/${username}`), {
            username,
            uid,
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
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
    try {
        return await set(ref(db, `users/${username}`), { ...updatedData, updatedOn: Date.now()});
    } catch (error) {
        throw new Error('Error updating user:' + error);
    }
};

export const changeCanBeInvitedStatus = async (username, status) => {
    try {
        return await set(ref(db, `users/${username}/canBeInvited`), status);
    } catch (error) {
        throw new Error('Error changing can be invited status:' + error);
    }
};

export const changeAdminStatus = async (username, status) => {
    try {
        return await set(ref(db, `users/${username}/isAdmin`), status);
    } catch (error) {
        throw new Error('Error changing admin status:' + error);
    }
};

export const changeBanStatus = async (username, status) => {
    try {
        return await set(ref(db, `users/${username}/isBanned`), status);
    } catch (error) {
        throw new Error('Error changing ban status:' + error);
    }
};

//Check if there is another way to do it
export const updateUserAvatar = async (username, avatarURL) => {
    try {
        const changeAvatar = {};
        changeAvatar[`users/${username}/avatarURL`] = avatarURL;
    
        return await update(ref(db), changeAvatar);
    } catch (error) {
        throw new Error('Error updating avatar' + error);
    }
};

//Transfer these 3 functions to event services and test them to see if they work as expected
export const addUserCreatedEvent = async (username, eid) => {
    try {
        return await set(ref(db, `users/${username}/createdEvents/${eid}`));
    } catch (error) {
        throw new Error('Error adding created event to user:' + error);
    }
};

export const addUserInvitedEvent = async (username, eid) => {
    try {
        return await set(ref(db, `users/${username}/invitedEvents/${eid}`));
    } catch (error) {
        throw new Error('Error adding invited event to user:')
    }
};

export const addUserParticipatedEvent = async (username, eid) => {
    try {
        return await set(ref(db, `users/${username}/participatedEvents/${eid}`));
    } catch (error) {
        throw new Error('Error adding participated event to user:' + error);
    }
};