import propTypes from 'prop-types';
import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

/**
 * This component protects the routes from unauthorized access.
 * @param {{children: any }} props - The children to be rendered
 * @returns {JSX.Element}
 */

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
