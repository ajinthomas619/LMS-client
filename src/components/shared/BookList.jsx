import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../lib/baseUrl";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const userData = useSelector((state) => state.persisted.user.userData);

  const getBooks = async () => {
    try {
        const response = await axios.get(
          `${BASE_URL}/books/show-books-for-user/${userData._id}`,
          { withCredentials: true }
        );
        console.log("The response of getBooks is", response);
        setBooks(response.data.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
    useEffect(() => {
    getBooks();
  }, [userData._id]);

  const handleBorrow = async (id) => {
    try {
      console.log("The book ID", id);
      const response = await axios.post(
        `${BASE_URL}/order/create-order`,
        {
          userId: userData._id,
          bookId: id,
          noofdays: 7,
        },
        { withCredentials: true }
      );
      if (response.status) {
        setBooks(
          books.map((book) =>
            book._id === id
          ? { ...book, borrwedUsers: [...book.borrwedUsers || [], userData._id] }
          : book
        )
      );
      getBooks()
      toast.success("Order created successfully");
      console.log("The response of order is", response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("The error is", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3} sx={{ ml: 4 }}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  image={`http://localhost:3000/books/${book.image}`}
                  alt={book.title}
                />
              </Box>
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{book.author}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleBorrow(book._id)}
                >
                  Borrow
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
