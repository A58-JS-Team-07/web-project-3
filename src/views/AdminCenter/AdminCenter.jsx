import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { changeBanStatus } from "../../services/users.service";
import UserSnippet from "../../components/UserSnippet/UserSnippet";
import { toast } from "react-toastify";
import { searchUsers, getAllUsersExcludeCurrent } from "../../services/users.service";
import Button from "../../components/Button/Button";

function AdminCenter() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [displayCount, setDisplayCount] = useState(7);
  // const [userCount, setUserCount] = useState(0);

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    const searchUsersData = await searchUsers(userData.username, e.target.value)
      .then((res) => {
        return res;
      });
    setUsers(searchUsersData);
  };

  useEffect(() => {
    const loadAllUsersList = async () => {
      const loadUsers = await getAllUsersExcludeCurrent(userData.username).then((res) => {
        return res;
      });
      setUsers(loadUsers);
      setUserCount(loadUsers.length);
    }
    loadAllUsersList();
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50) return;
  //     setDisplayCount(prevCount => prevCount + 7);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [displayCount]);

  function handleBanUser(user) {
    const currStatus = user.isBanned;
    changeBanStatus(user.username, !currStatus).then(() => {
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.uid === user.uid) {
            return { ...u, isBanned: !currStatus };
          }
          return u;
        });
      });
      console.log("User banned/unbanned", user.isBanned);
      toast.success(`User ${user.username} has been ${!user.isBanned ? "banned" : "unbanned"}!`);
    });
  }

  return (
    <div className="admin-center-page">
      <h1 className="admin-center-header text-3xl font-bold p-3">Admin Center</h1>
      <div className="search-bar p-3">
        <label className="input input-bordered flex grow items-center gap-2 max-w-[300px]">
          <input
            type="text"
            className="grow"
            placeholder="Enter username or email address"
            value={search}
            onChange={(e) => handleChange(e)}
          // onKeyDown={(e) => handleChange(e)}
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
      </div>
      <h2 className="admin-center-header text-2xl font-bold p-5">Users List</h2>
      <div className="user-list bg-base-200 w-4/5 min-w-1/2 p-4 ml-5 rounded-3xl">
        {users
          .filter((user) => user.uid !== userData.uid)
          .slice(0, displayCount)
          .map((user) => {
            return (
              <>
                <div className="user-snippet-data flex flex-row gap-4 bg-base-100 m-2 p-3 rounded-xl">
                  <UserSnippet
                    key={user.uid}
                    user={user}
                    handleBanUser={handleBanUser}
                    adminActions={true}
                  />
                </div>
              </>
            );
          })}
        {users.length === 0 && <p>No users found</p>}
        {users.length > displayCount && (
          <div className="flex justify-center p-4">
            <Button
              style="load-more-btn btn-active btn-ghost"
              onClick={() => setDisplayCount((prevCount) => prevCount + 7)}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCenter;