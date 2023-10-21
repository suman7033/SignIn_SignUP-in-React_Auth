import { useState } from "react";
import React from 'react'

const AuthContext=React.createContext({
  token: '',
  isLoggedIn: false,
  login: (tokan)=>{},
  logout: ()=>{}
});

 export const AuthContextProvider=(props)=>{
  const [tokan,setTokan]=useState(null);
  //const userIsLoggedIn=!!tokan;

  const loginHandler=(tokan)=>{
       
       setTokan(tokan);
       
  }
  const logoutHandler=()=>{
        setTokan(null);
  }
  const contextValue={
    tokan :tokan,
    isLoggedIn: !!tokan,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;