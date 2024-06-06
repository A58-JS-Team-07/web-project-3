import { db } from '../config/firebase-config.js';
import { set, ref, get, push } from 'firebase/database';

export const createContactsList = async (username, listName) => {
    try {
        const contactListRef = await push(ref(db, "contactsLists"), {
            listName,
            owner: username,
            contacts: [],
        });

        const clid = contactListRef.key;
        
        await set(ref(db, `users/${username}/contactsListsOwner/${clid}`), true);
    } catch (error) {
        console.error('Error creating contacts list: ' + error);
    }
}

export const addContactToList = async (clid, contact) => {
    try {
        await set(ref(db, `contactsLists/${clid}/contacts/${contact.username}`), true);
        await set(ref(db, `users/${contact.username}/contactsListsParticipant/${clid}`), true);
    } catch (error) {
        console.error('Error adding contact to list: ' + error);
    }
}

export const removeContactFromList = async (clid, contact) => {
    try {
        await set(ref(db, `contactsLists/${clid}/contacts/${contact.username}`), null);
        await set(ref(db, `users/${contact.username}/contactsListsParticipant/${clid}`), null);
    } catch (error) {
        console.error('Error removing contact from list: ' + error);
    }
}

export const deleteContactsList = async (clid, owner) => {
    try {
        await set(ref(db, `contactsLists/${clid}`), null);
        await set(ref(db, `users/${owner}/contactsListsOwner/${clid}`), null);
    } catch (error) {
        console.error('Error deleting contacts list: ' + error);
    }
}

export const getContactsFromList = async (clid) => {
    try {
        const contactsListSnapshot = await get(ref(db, `contactsLists/${clid}`));
        if (!contactsListSnapshot.exists()) return [];
        const contactsListsValues = contactsListSnapshot.val();

        console.log("contactsListsValues", contactsListsValues);
        console.log("contactsListId", clid);

        if (!contactsListsValues?.contacts) {
            return [];
        }
        
        console.log("contactsListsValuesAAA", Object.keys(contactsListsValues.contacts));
        const contactsList =Object.keys(contactsListsValues.contacts);
        console.log("contactsListVal", contactsList);

        return contactsList;
    } catch (error) {
        console.error("Error in contactsLists.services > getContactsList:", error);
    }
};

export const getAllContactsLists = async () => {
    try {
        const contactsListsSnapshot = (await get(ref(db, 'contactsLists')));
        if (!contactsListsSnapshot.exists()) return [];
        const contactsListsValues = contactsListsSnapshot.val();

        const contactsLists = Object.keys(contactsListsValues).map((key) => {
            return {
                clid: key,
                ...contactsListsValues[key],
            };
        });

        return contactsLists;
    } catch (error) {
        console.error("Error in contactsLists.services > getAllContactsLists:", error);
    }
};

export const getAllContactsListsByUser = async (username) => {
    try {
        const ContactsListsSnapshot = await get(ref(db, `users/${username}/contactsListsOwner`));
        if (!ContactsListsSnapshot.exists()) return [];
        const contactsListsIds = Object.keys(ContactsListsSnapshot.val());
        // console.log("contactsListsIds", contactsListsIds);

        const getAllContactsListsValues = await getAllContactsLists();
        // console.log("getAllContactsListsValues", getAllContactsListsValues);
            
        const contactsLists = contactsListsIds.map((clid) => {
            return getAllContactsListsValues.find((contactsList) => contactsList.clid === clid);
        });
        // console.log("contactsLists", contactsLists);
        return contactsLists;
        
    } catch (error) {
        console.error("Error in contactsLists.services > getAllContactsListsByUser:", error);
    }

}
export const updateContactsList = async (clid, listName) => {
    try {
        await set(ref(db, `contactsLists/${clid}/listName`), listName);
    } catch (error) {
        console.error('Error updating contacts list: ' + error);
    }
};

export const isContactInList = async (clid, contact) => {
    try {
        const contactSnapshot = await get(ref(db, `contactsLists/${clid}/contacts/${contact.username}`));
        return contactSnapshot.exists();
    } catch (error) {
        console.error('Error checking if contact is in list: ' + error);
    }
};