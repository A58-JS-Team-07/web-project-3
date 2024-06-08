import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoAmericanFootballOutline,
  IoIdCardOutline,
  IoConstructOutline,
  IoPersonOutline,
  IoPowerOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { logoutUser } from "../../../services/auth.service";

function SideMenu() {
  const { userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
   

  const logout = async () => {
    await logoutUser();
    navigate("/");
    setAppState({ user: null, userData: null });
  };

  return (
    <div className="sidebar flex flex-col">
      <div className="navbar sidebar__header p-2 pl-6 h-20 bg-primary border-b-2 border-gray-500 border-opacity-30  gap-3">
        <IoCalendarOutline className="text-4xl fill-secondary text-secondary" />
        <a className="text-2xl font-medium text-white">Sports Calendar</a>
      </div>
      <div className="sidebar__body bg-primary flex-grow">
        <ul className="menu p-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}
            >
              {
                <IoHomeOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events"  className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}>
              {
                <IoAmericanFootballOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              All Events
            </NavLink>
          </li>
          {userData && (
<>
          <li>
            <NavLink to="my-calendar"  className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}>
              {
                <IoCalendarOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              My Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="contacts-lists"  className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}>
              {
                <IoIdCardOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Contacts Lists
            </NavLink>
          </li>
</>
          )}
        </ul>
        <hr className="border-t-2 border-gray-500 opacity-30" /> 
        {userData && (

        <ul className="menu p-2">
          <li>
            <NavLink to="admin-center"  className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}>
              {
                <IoConstructOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Admin Center
            </NavLink>
          </li>
          <li>
            <NavLink to="profile"  className={({ isActive }) =>
                `text-lg text-white flex items-center rounded-none ${
                  isActive ? "border-l-4 border-secondary pl-3" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "transparent" : undefined,
                outline: "none",
                color: isActive ? "white" : undefined,
              })}>
              {
                <IoPersonOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Profile
            </NavLink>
          </li>
          <li>
            <a className="text-lg text-white" onClick={logout}>
              {
                <IoPowerOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Logout
            </a>
          </li>
        </ul>
        )} 
        <hr className="border-t-2 border-gray-500 opacity-30" />
        {<ThemeSwitcher />}
      </div>
    </div>
  );
}

export default SideMenu;
