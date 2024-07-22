import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const userData = useSelector((state) => state.persisted.user.userData);
  console.log("protected route userdata",userData)
  useEffect(() => {
    console.log("hi")
  },[])
  return userData?._id ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoutes;
