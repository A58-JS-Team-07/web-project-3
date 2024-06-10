import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";
import PropTypes from "prop-types";

/**
 *
 * @param {{children: any }} props
 * @returns
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
