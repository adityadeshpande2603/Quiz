import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const [currentLocation,setCurrentLocation]=useState();

  const updateUser = (data) => {
    setCurrentUser(data);
    // 
  }

  const updateLocation =(data)=>{
    setCurrentLocation(data);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUser, currentLocation ,setCurrentLocation,updateLocation }}>
      {children}
    </AuthContext.Provider>
  );
};