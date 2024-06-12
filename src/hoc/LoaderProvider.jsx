import { useState } from "react";
import { LoaderContext } from "../context/LoaderContext";
import Loader from "../components/Loader/Loader";
import propTypes from "prop-types";

/**
 * This component provides a loader for the application.
 * @param {{children: any}} props - The children to be rendered
 * @returns {JSX.Element}
 */

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

LoaderProvider.propTypes = {
  children: propTypes.node.isRequired,
};
