import AuthLayout from "../auth/AuthLayout";
import SigninForm from "../auth/forms/SIgninForm";
import SignupForm from "../auth/forms/SignupForm";
import { Routes, Route } from "react-router-dom";
import Home from "../root/pages/Home";
import ProtectedRoutes from "./protectedRoutes";

const UserRoutes = () => {
  return (
      
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<SigninForm />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/*" element={<Home />} />
      </Route>
    </Routes>
    
  );
};

export default UserRoutes;
