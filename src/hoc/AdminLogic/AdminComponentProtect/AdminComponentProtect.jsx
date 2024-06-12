import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import PropTypes from "prop-types";

/**
 * This component protects the admin components from unauthorized access.
 * @param {{children: any }} props - The children to be rendered
 * @returns {JSX.Element}
 */

export default function AdminComponentProtect({ children }) {
  const { userData } = useContext(AppContext);

  if (userData?.isAdmin) {
    return children;
  }
}

AdminComponentProtect.propTypes = {
  children: PropTypes.any.isRequired,
};
