import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../constants";
import { useAppSelector } from "../../features/hooks";

// Checking for an Access Token, and then proceeding to the requested route. If an Access Token doesn't exist, redirect to the login screen.
const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.accessToken) {
    return <Navigate to={PublicRoutes.LOGIN} replace />;
  }

  // If passed, render the requested route
  return <Outlet />;
};

export default PrivateRoute;
