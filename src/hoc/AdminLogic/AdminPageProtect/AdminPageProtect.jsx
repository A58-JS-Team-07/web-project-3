import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

/**
 *
 * @param {{children: any }} props
 * @returns
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
