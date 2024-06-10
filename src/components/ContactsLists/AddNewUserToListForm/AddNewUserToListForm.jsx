import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { searchUsers, getAllUsersExcludeCurrent } from '../../../services/users.service';
import UserSnippet from '../../UserSnippet/UserSnippet';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

function AddNewUserToListFrom({ showModal, setShowModal = () => { }, contactsList }) {
    const [newContactName, setNewContactName] = useState('');
    const [searchUsersList, setSearchUsersList] = useState([]);
    const { userData } = useContext(AppContext);

    const handleChange = async (e) => {
        setNewContactName(e.target.value);
        const searchUsersData = await searchUsers(userData.username, e.target.value).then((res) => {
            return res;
        });

        setSearchUsersList(searchUsersData);
    };

    useEffect(() => {
        const loadAllUsersList = async () => {
            const loadUsers = await getAllUsersExcludeCurrent(userData.username).then((res) => {
                return res;
            });
            setSearchUsersList(loadUsers);
        }
        loadAllUsersList();
    }, []);

    function closeModal() {
        setShowModal(false);
    }

    return (
        <div>
            {showModal ? (
                <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  min-w-full min-h-full bg-black z-10 bg-opacity-60 ">
                    <div className="create-event-modal m-8 rounded-3xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[30%] min-h-[30%] max-h-[80%] overflow-auto max-w-7xl z-10 px-8 py-7">
                        <h2 className="text-3xl font-bold mb-5">Search for Contacts</h2>
                        <button
                            className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-6"
                            onClick={closeModal}
                        >
                            <IoClose />
                        </button>
                        <label className="input input-bordered flex mb-8 grow items-center gap-2 max-w-[600px]">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Enter username or email address"
                                value={newContactName}
                                onChange={handleChange}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-5 h-5 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                        {searchUsersList.length !== 0 && (
                            <div className="flex flex-col gap-6">
                                {searchUsersList.map((user) => (
                                    <UserSnippet
                                        key={user.uid}
                                        user={user}
                                        contactsList={contactsList}
                                    />
                                ))}
                            </div>
                        )}
                        {searchUsersList.length === 0 && (
                            <div className="text-xl">
                                No users found
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default AddNewUserToListFrom;   