import { createContext, useState } from "react";
import Loader from "../components/Loader/Loader";
import propTypes from "prop-types";

export const LoaderContext = createContext({
  loading: false,
  setLoading: () => {},
});
