import CreateEventModal from "../../Events/CreateEvent/CreateEventModal/CreateEventModal";
import { NavLink } from "react-router-dom";
import Notifications from "../../Notifications/Notifications";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { logoutUser } from "../../../services/auth.service";

function Header() {
  const { user, setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  return (
    <div className="navbar bg-base-200 p-2 px-6 min-h-[80px]">
      <div className="flex-1 gap-6 h-16">
        <label className="input input-bordered flex grow items-center gap-2 max-w-[600px]">
          <input type="text" className="grow" placeholder="Search" />
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
      <div className="flex-none gap-2">
        {!user ? (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/login" className="text-lg">
                  Login / Register
                </NavLink>
              </li>
            </ul>
          </div>

        ) : (
          <>
            <CreateEventModal />
            <Notifications />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/profile" className="justify-between text-base">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <a className="text-base" onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Header;
