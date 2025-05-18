import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PageNotFound from "./ChildComponents/PageNotFound";
import Unauthorized from "./ChildComponents/Unauthorized";
import { PrivateRoutes, PublicRoutes } from "./constants";
import Phishing from "../pages/Phishing";
import PrivateRoute from "./ChildComponents/PrivateRoute";
import PersistLogin from "./ChildComponents/PersistLogin";
import Attempts from "../pages/Attempts";

// Define public routes
const publicRoutes = (
  <>
    <Route path={PublicRoutes.UNAUTHORIZED} element={<Unauthorized />} />
    <Route path={"/"} element={<Login />} />
    <Route path={PublicRoutes.LOGIN} element={<Login />} />
    <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
    <Route path={`${PublicRoutes.PHISHING}/:id`} element={<Phishing />} />
  </>
);

// Define private routes
const privateRoutes = (
  <Route element={<PersistLogin />}>
    <Route element={<PrivateRoute />}>
      <Route path={PrivateRoutes.ATTEMPTS} element={<Attempts />} />
    </Route>
  </Route>
);

// Main router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<PageNotFound />}>
      {/** Private Routes */}
      {privateRoutes}
      {/** Public Routes */}
      {publicRoutes}
    </Route>
  )
);

export default router;
