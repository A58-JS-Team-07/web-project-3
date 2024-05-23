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

function SideMenu() {
  return (
    <div className="sidebar flex flex-col">
      <div className="navbar sidebar__header p-2 pl-6 h-20 bg-primary border-b-2 border-gray-500 border-opacity-30  gap-3">
        <IoCalendarOutline className="text-4xl fill-secondary text-secondary" />
        <a className="text-2xl font-medium text-white">Sports Calendar</a>
      </div>
      <div className="sidebar__body bg-primary flex-grow">
        <ul className="menu p-2">
          <li>
            <a className="text-lg text-white">
              {
                <IoHomeOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Home
            </a>
          </li>
          <li>
            <a className="text-lg text-white">
              {
                <IoAmericanFootballOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              All Events
            </a>
          </li>
          <li>
            <a className="text-lg text-white">
              {
                <IoCalendarOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              My Calendar
            </a>
          </li>
          <li>
            <a className="text-lg text-white">
              {
                <IoIdCardOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Contacts Lists
            </a>
          </li>
        </ul>
        <hr className="border-t-2 border-gray-500 opacity-30" />
        <ul className="menu p-2">
          <li>
            <a className="text-lg text-white">
              {
                <IoConstructOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Admin Center
            </a>
          </li>
          <li>
            <a className="text-lg text-white">
              {
                <IoPersonOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Profile
            </a>
          </li>
          <li>
            <a className="text-lg text-white">
              {
                <IoPowerOutline className="text-xl fill-secondary text-secondary" />
              }{" "}
              Logout
            </a>
          </li>
        </ul>
        <hr className="border-t-2 border-gray-500 opacity-30" />
        {<ThemeSwitcher />}
      </div>
    </div>
  );
}

export default SideMenu;
