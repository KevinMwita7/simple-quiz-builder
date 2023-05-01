import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from "./AuthContext";
import { ROUTES } from '../utils/constants';

function RequireAuth({ children }) {
    let auth = useContext(AuthContext);
    let location = useLocation();

    if (!auth?.user?.isLoggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected.
      return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth;