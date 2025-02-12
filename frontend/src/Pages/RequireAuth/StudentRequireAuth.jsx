import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../lib/authContext/AuthContext";




const StudentRequireAuth = () => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/student/signin"></Navigate>
  ) : (
    <div >
    
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>

  )
}

export {  StudentRequireAuth };