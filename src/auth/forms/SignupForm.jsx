import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography, Button, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { addUser, clearUser } from "../../redux/slices/userSlices";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        Sign-Up!
      </Typography>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:3000/api/auth/signup", values, { withCredentials: true })
            .then((response) => {
                const data = response.data.data
                console.log("the signup data",data)
                toast.success("Signup successful!");
                navigate("/login");
                dispatch(clearUser())
                dispatch(addUser(data))
                console.log("th response is",response)
            })
            .catch((error) => {
              toast.error("Signup failed!");
              console.error("Signup error:", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ boxShadow: 3, p: 6, gap: 2, m: 4 }}>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className=" border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
                <ErrorMessage name="username" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className=" border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
                <ErrorMessage name="email" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className=" border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
                <ErrorMessage name="phone" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className=" border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
                <ErrorMessage name="password" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className=" border-2 rounded-lg"
                  sx={{ my: 2, border: 1, borderRadius: 2 }}
                />
                <ErrorMessage name="confirmPassword" component="div" />
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
            </Box>
          </Form>
        )}
      </Formik>
      <a href="/login">
     already a user?sign-in
      </a>
    </div>
  );
};

export default SignupForm;
