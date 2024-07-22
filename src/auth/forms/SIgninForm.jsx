import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Box } from "@mui/material";
import toast from "react-hot-toast";
import { Formik,Form,Field } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlices";
const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        Sign In
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:3000/api/auth/login", values, { withCredentials: true })
            .then((response) => {
              console.log("the response oif login user",response)
              dispatch(addUser(response.data.data))
              if(!response.data.data.isAdmin){
              navigate('/')
              } 
              else{
                navigate('/admin/')
              }
              
            })
            .catch((error) => {
              toast.error("invalid credentials");
              console.error("error in login", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
          
              <Box sx={{ m: 4 }}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                sx={{ ml: 10 }}
              >
                Submit
              </Button>
            
          </Form>
  )}
      </Formik>
      <a href="/signup">
     not a user?sign-up
      </a>
    </div>
  );


};

export default SigninForm;
