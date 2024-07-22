import React,{useEffect} from 'react'
import axios from 'axios'
import {User} from 'lucide-react'
import Search from './Search'
import {Link,Route,Routes,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Button, Typography } from '@mui/material'
import { clearUser } from '../../redux/slices/userSlices'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.persisted.user.userData);

  

  const logout = async() => {
    try {
      await axios.post(`http://localhost:3000/api/auth/logout`)
      dispatch(clearUser(currentUser));
      navigate('/login')
   
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <section className='topbar bg-blue-300 fixed w-full'>
      <div className='flex flex-row justify-between py-1 px-5 gap-2'>
        <Link to="/" className='flex gap-3 items-center'>
        <Typography sx={{p:2}}>
          Home
        </Typography>
        </Link>
        <div className='mt-2'>
          <Search />
          </div>
          <div className='flex gap-2 mt-1'>
            <Button  onClick={logout}>
              Logout
            </Button>
        </div>
      </div>
    </section>
  )
}

export default Navbar