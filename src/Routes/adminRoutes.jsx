import { Route,Routes } from "react-router-dom";
import AdminLayout from "../admin/pages/AdminLayout";
import AdminHome from "../admin/components/AdminHome";
import BookManagement from "../admin/components/BookManagement";
import UserManagement from "../admin/components/UserManagement";
import BookForm from "../components/forms/BookForm";
import ProtectedRoutes from "./protectedRoutes";


const AdminRoutes = () => {
    return (
  <Routes>
    <Route element={<ProtectedRoutes />} >
     <Route element={<AdminLayout />}>
       <Route path="/" element={<AdminHome/>}/>
       <Route path="/user-management" element={<UserManagement/>}/>
       <Route path="/book-management" element={<BookManagement/>}/>
       <Route path="/add-book" element={<BookForm/>}/>
     </Route>
     </Route>

  </Routes>
    )
}
export default AdminRoutes