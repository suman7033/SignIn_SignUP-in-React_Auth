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
  const userIsLoggedIn=!!tokan;

  const loginHandler=(tokan)=>{
    
       setTokan(tokan); //set the tokan recived as an argument
  }
  const logoutHandler=()=>{
        setTokan(null);
  }
  const contextValue={
    tokan :tokan,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;