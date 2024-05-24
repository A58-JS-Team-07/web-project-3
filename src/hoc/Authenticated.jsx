import propTypes from 'prop-types';
import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

export default function Authenticated ({ children }) {
    const { user } = useContext(AppContext);
    const location = useLocation();

    if (!user) {
        return <Navigate replace to="/login" state={{ from: location }}/>
    }

    return (
        <>
            {children}
        </>
    )
}

Authenticated.propTypes = {
    children: propTypes.any.isRequired
}
