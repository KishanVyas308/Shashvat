import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const CheckIsAdmin = () => {
  const user = useRecoilValue(userAtom);

  if (user === null) {
    // Redirect to login if not logged in
    alert("Please log in first!");
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    alert("You are not an admin!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default CheckIsAdmin;