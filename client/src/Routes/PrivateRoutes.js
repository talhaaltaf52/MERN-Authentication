import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const {token} = useSelector((state) => state.TokenReducer);
  const setAuth = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  const auth = setAuth();
  return <>{auth ? <Navigate to="/" /> : <Outlet />}</>;
};

export default PrivateRoutes;
