import React from "react";
import FileUploader from "../shared/FIlleUploader";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";

const BookForm = ({ book }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    copies: Yup.number().required("Number of copies is required"),
    genre: Yup.string().required("Genre is required"),
    language: Yup.string().required("Language is required"),
  });

  const initialValues = {
    title: book?.title || "",
    author: book?.author || "",
    copies: book?.copies || 0,
    genre: book?.genre || "",
    language: book?.language || "",
    file: null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("copies", values.copies);
    formData.append("genre", values.genre);
    formData.append("language", values.language);

    if (values.file) {
      console.log("values.file",values.file)
      formData.append("file", values.file[0]);
    }
  
    // Debug the FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    console.log("the form data",formData)

    const apiUrl = book
      ? `http://localhost:3000/api/books/edit-book/${book._id}`
      : `http://localhost:3000/api/books/add-book`;
    const apiMethod = book ? axios.put : axios.post;

    apiMethod(apiUrl, formData, { withCredentials: true })
      .then((response) => {
        console.log("The response is", response);
        toast.success(`Book ${book ? "updated" : "added"} successfully`);
        navigate("/admin/book-management");
      })
      .catch((error) => {
        toast.error(`Error ${book ? "updating" : "adding"} book`);
        console.error("Something error occurred", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCancel = () => {
    navigate("/admin/book-management");
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        {book ? "Update Book" : "Add Book"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box sx={{ boxShadow: 3, p: 6, gap: 2, m: 4 }}>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="border-2 rounded-lg"
                />
                <ErrorMessage name="title" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="author"
                  placeholder="Author"
                  className="border-2 rounded-lg"
                />
                <ErrorMessage name="author" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="number"
                  name="copies"
                  placeholder="Copies"
                  className="border-2 rounded-lg"
                />
                <ErrorMessage name="copies" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <FileUploader
                  fieldChange={(file) => setFieldValue("file", file)}
                />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  className="border-2 rounded-lg"
                />
                <ErrorMessage name="genre" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <Field
                  type="text"
                  name="language"
                  placeholder="Language"
                  className="border-2 rounded-lg"
                />
                <ErrorMessage name="language" component="div" />
              </Box>
              <Box sx={{ m: 4 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border-2 rounded-lg p-2 bg-primary"
                >
                  {book ? "Update Book" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border-2 rounded-lg p-2 bg-secondary"
                >
                  Cancel
                </button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;
