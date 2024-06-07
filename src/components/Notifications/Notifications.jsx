import { useContext, useEffect, useState } from "react";
import SingleNotification from "./SingleNotification/SingleNotification";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import { AppContext } from "../../context/AppContext";

function Notifications() {
  const { userData, setAppState } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    try {
      return onValue(
        ref(db, `users/${userData?.username}/beingInvited`),
        (snapshot) => {
          if (!snapshot.exists()) {
            return setNotifications([]);
          }

          const notifications = Object.keys(snapshot.val()).map((key) => {
            return { [key]: snapshot.val()[key] };
          });

          setNotifications(notifications);
        }
      );
    } catch (error) {
      console.error("Error in Notification.jsx > UseEffect: ", error);
      throw error;
    }
  }, []);

  console.log("notificationsState: ", notifications);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4">
            <div className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 opacity-70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                {notifications.length !== 0 && (
                  <span className="badge badge-xs badge-secondary indicator-item"></span>
                )}
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-5 w-80 min-h-full bg-base-200 text-base-content">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <div className="all-notifications">
              {/*TODO: Refractor this hell of a mess bellow!!! */}
              {notifications.length !== 0 ? (
                notifications.map((notificationEventId) => {
                  return Object.values(notificationEventId).map(
                    (notificationUsername) => {
                      const notificationeid =
                        Object.keys(notificationEventId)[0];

                      console.log("notificationEventId: ", notificationeid);

                      return Object.keys(notificationUsername).map(
                        (notificationUser) => {
                          return (
                            <SingleNotification
                              key={`${notificationeid}-${notificationUser}`}
                              inviter={notificationUser}
                              event={notificationeid}
                            />
                          );
                        }
                      );
                    }
                  );
                })
              ) : (
                <div className="text-lg mt-5 ">You are all caught up!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
