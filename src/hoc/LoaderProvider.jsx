import { useState } from "react";
import Loader from "../components/Loader/Loader";
import propTypes from "prop-types";
import { LoaderContext } from "../context/LoaderContext";

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
