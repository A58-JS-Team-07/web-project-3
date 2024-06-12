import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import PropTypes from "prop-types";

/**
 * Тhis component protects the admin page from unauthorized access.
 * @param {{children: any }} props
 * @returns {JSX.Element}
 */
export default function AdminPageProtect({ children }) {
  const { userData } = useContext(AppContext);

  if (userData?.isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate replace to="/" />;
  }
}

AdminPageProtect.propTypes = {
  children: PropTypes.any.isRequired,
};
