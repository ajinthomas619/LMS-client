import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { Field, Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import { editUser } from "../../redux/slices/userSlices";


const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.persisted.user.userData);
  console.log("the user data for edit profile",userData)

  const initialValues = {
    username: userData.username || "",
    email: userData.email || "",
    phone:userData.phone || "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(
        `http://localhost:3000/api/user/edit-user/${userData._id}`,
        values,
        {
          withCredentials: true,
        }
      );

      dispatch(editUser(values));
      navigate("/profile");
    } catch (error) {
      console.log("Error in updating user data", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Profile
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{ minWidth: 150 }}
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default EditProfile;
