import CreateEventModal from "../../Events/CreateEvent/CreateEventModal/CreateEventModal";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Notifications from "../../Notifications/Notifications";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { logoutUser } from "../../../services/auth.service";
import {
  searchPublicEvents,
  searchUserViewEvents,
  searchAdminViewEvents,
} from "../../../services/events.service";
import { LoaderContext } from "../../../context/LoaderContext";
import { WEATHER_API_KEY } from "../../../common/constants";
import WeatherInfo from "../../WeatherInfo/WeatherInfo";

function Header() {
  const { userData, setAppState } = useContext(AppContext);
  const { setLoading } = useContext(LoaderContext);
  const [weather, setWeather] = useState(null);

  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    navigate("/");
    setAppState({ user: null, userData: null });
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);

      if (userData?.isAdmin === true) {
        const searchAdminEvents = await searchAdminViewEvents(e.target.value);
        handleSearchNavigate(e, searchAdminEvents);
      } else if (userData?.isAdmin === false) {
        const searchUserEvents = await searchUserViewEvents(
          e.target.value,
          userData.username
        );
        handleSearchNavigate(e, searchUserEvents);
      } else {
        const searchPublicEventsData = await searchPublicEvents(e.target.value);
        handleSearchNavigate(e, searchPublicEventsData);
      }
      setLoading(false);
    }
  };

  const handleSearchNavigate = (e, searchEvents) => {
    navigate(`/events?search=${e.target.value}`, { state: { searchEvents } });
  };

  useEffect(() => {
    if (userData?.address) {
      const address = userData?.address;

      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${address}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Error trying to set Weather API:", error);
        });
    }
  }, [WEATHER_API_KEY, userData]);

  return (
    <div className="navbar bg-base-200 p-2 px-6 min-h-[80px]">
      <div className="flex-1 gap-6 h-16">
        <label className="input input-bordered flex grow items-center gap-2 max-w-[600px]">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onKeyDown={handleSearch}
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
      <div className="flex-none gap-2">
        <div className="weather flex flex-row">
          {userData?.address && <WeatherInfo weatherData={weather} />}
        </div>
        {!userData ? (
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
                  {!userData?.avatar ? (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXu0uM0MmYsVPFaV2PqrkyuFqvK5k3RPt-g1NYd-vgpUGBSoyb4UXNG9MbUZn4hcPFoLk&usqp=CAU"
                    />
                  ) : (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData.avatar}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 pb-4"
              >
                <h2 className="text-lg font-semibold px-3 pt-2 pb-2 border-b-2 mb-1">
                  {"Hi, " + userData?.firstName + " " + userData?.lastName}
                </h2>
                <li>
                  <NavLink to="/profile" className="justify-between text-base">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <a className="text-base" onClick={logout}>
                    Logout
                  </a>
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
