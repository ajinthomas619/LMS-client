import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Avatar,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from '../forms/EditProfile';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const User = useSelector((state) => state.persisted.user.userData);
  const id = User._id;
  console.log("the user", User);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/get-user/${id}`, {
          withCredentials: true
        });
        console.log("The response of fetch user", response);
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log("Error in fetching user data", error);
      }
    };
    fetchUserData();
  }, [id,User]);

  if (!currentUser) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  const handleEdit = () => {
    navigate(`edit-profile/${id}`);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',maxWidth: 600, position: 'relative', mt: { xs: 12, md: 12 },ml:{xs:16,md:16}, backgroundColor: '#F7DCB9' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
              <Avatar
                alt={currentUser.username}
                src={currentUser.profilePicture} 
                sx={{ width: 100, height: 100, marginBottom: 2 }}
              />
              <Typography variant="h5" component="div">
                {currentUser.username}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {currentUser.email}
              </Typography>
              <IconButton
                color="primary"
                sx={{ position: 'absolute', bottom: 10, right: 10 }}
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
          
              <Typography variant="h6" component="div" gutterBottom>
                User Details
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Username:</strong> {currentUser.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
             
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Routes>
        <Route path="edit-profile/:id" element={<EditProfile />} />
      </Routes>
    </Container>
  );
};

export default Profile;
