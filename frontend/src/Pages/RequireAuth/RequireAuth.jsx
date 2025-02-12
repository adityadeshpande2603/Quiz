import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../lib/authContext/AuthContext";




const RequireAuth = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return !currentUser ? (
    <Navigate to="/teacher/signin" state={{ from: location }} replace />
  ) : (
    <div >
    
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>

  )
}

export {  RequireAuth };