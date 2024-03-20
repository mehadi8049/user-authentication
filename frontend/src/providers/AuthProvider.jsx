import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthDispatchContext } from "../context/AuthContext";

const  AuthProvider=({ children })=>{
    const [authDetails, setAuthDetails] = useState(JSON.parse(localStorage.getItem("loginData")));
  
    return (
      <AuthContext.Provider value={authDetails}>
        <AuthDispatchContext.Provider value={setAuthDetails}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    );
}

export {AuthProvider}