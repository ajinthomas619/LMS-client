import React from 'react'
import axios from 'axios'
import {Link ,useNavigate} from 'react-router-dom'
import { clearUser } from '../../redux/slices/userSlices'
import { useDispatch, useSelector } from 'react-redux'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.persisted.user.userData);

    const handleLogout = async() => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout",{withCrededntials:true})
            dispatch(clearUser(userData));
            navigate("/login")
        } catch (error) {
            console.log(error)

        }
    }

  return (
    <nav className="bg-indigo-300  py-4 w-3/4 px-96 md:w-full">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/admin" className="text-black font-bold text-xl ">
            <h2>Admin</h2>
        </Link>
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
            Logout
        </button>
    </div>
</nav>
  )
}

export default AdminNavbar