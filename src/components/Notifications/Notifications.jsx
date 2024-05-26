import SingleNotification from "./SingleNotification/SingleNotification";

function Notifications() {
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
                <span className="badge badge-xs badge-secondary indicator-item"></span>
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
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
              <SingleNotification />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
