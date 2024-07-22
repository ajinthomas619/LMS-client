import React from 'react';
import { NavLink, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlices';
import { Typography, Button, Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserManagement from './UserManagement';
import BookManagement from './BookManagement';
import BookForm from '../../components/forms/BookForm';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userData = useSelector((state) => state.persisted.user.userData);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = async () => {
    try {
      await axios.post(`http://localhost:3000/api/auth/logout`);
      dispatch(clearUser(userData));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <Box className='flex flex-col gap-3 px-2 bg-green-100'>
      <NavLink to='/admin/user-management' className='flex gap-3 items-center hover:bg-red-200' >
        <Typography variant='contained' sx={{ mx: 2, p: 2 }}>
          Users
        </Typography>
      </NavLink>
      <NavLink to='/admin/book-management' className='flex gap-3 items-center hover:bg-red-200'>
        <Typography variant='contained' sx={{ mx: 2, p: 2 }}>
          Books
        </Typography>
      </NavLink>
      <NavLink to='/admin/add-book' className='flex gap-3 items-center hover:bg-red-200'>
        <Typography variant='contained' sx={{ mx: 2, p: 2 }}>
          Add Book
        </Typography>
      </NavLink>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mx: 2 }}>
        Logout
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, mt: 8, height: 'calc(100% - 64px)' }, // Adjust height and position
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, mt: 8, height: 'calc(100% - 64px)' }, // Adjust height and position
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, mt: { xs: 8, md: 8 } }} // Adjust mt to accommodate Navbar height
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
       
      </Box>
    </Box>
  );
};

export default Sidebar;
