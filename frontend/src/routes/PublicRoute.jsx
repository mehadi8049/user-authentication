import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const user = useContext(AuthContext);
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export default PublicRoute;