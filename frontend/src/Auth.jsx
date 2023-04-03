/* eslint-disable */
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Auth(Component) {
  return (props) => {
    const login = useSelector((state) => state.login.user);
    if (login) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
}

export default Auth;
