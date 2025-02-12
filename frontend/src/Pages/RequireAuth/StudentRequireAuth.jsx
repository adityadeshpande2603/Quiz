import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../lib/authContext/AuthContext";




const StudentRequireAuth = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation(); 
  return !currentUser ? (
    <Navigate to="/student/signin" state={{ from: location }} replace />
  ) : (
    <div >
    
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>

  )
}

export {  StudentRequireAuth };