
import Sidebar from "../../admin/components/Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen">
      <AdminNavbar />
      <div className="md:flex flex-1 h-full">
        <div className="hidden md:block w-1/5">
          <Sidebar />
        </div>
        <section className="flex flex-1 h-full bg-gray-100 p-4">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
