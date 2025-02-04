import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../lib/authContext/AuthContext";




const RequireAuth = () => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/teacher/signin"></Navigate>
  ) : (
    <div >
    
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>

  )
}

export {  RequireAuth };