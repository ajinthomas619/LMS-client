import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { BASE_URL } from "../../lib/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";

const MyBooks = () => {
  const [orders, setOrders] = useState([]);
  const userData = useSelector((state) => state.persisted.user.userData);

  const showMyBooks = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order/getUserOrder/${userData._id}`
      );
      if (response) {
        console.log("the response is", response.data);
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching orders", error);
    }
  };
  useEffect(() => {
    showMyBooks();
  }, [userData._id]);

  const handleReturn = async (id, returned) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/order/update-order/${id}`,
        {
          userId: userData._id,
          isReturn: !returned,
        },
        { withCredentials: true }
      );
      showMyBooks()
      console.log("The response of return order is", response.data);

      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, isReturned: !returned } : order
        )
      );
    } catch (error) {
      console.log("The error is", error);
    }
  };

  return (
    <Box sx={{ mt: 4, ml: 6 }}>
      <Typography variant="h4" gutterBottom>
        My Books
      </Typography>
      <List>
        {orders.map((book) => (
          <ListItem
            key={book.bookId._id}
            alignItems="flex-start"
            sx={{
              ml: 16,
              mt: 4,
              border: "1px solid black",
              borderRadius: 2,
              width: 800,
              gap: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0", // Light gray background on hover
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={`http://localhost:3000/books/${book.bookId.image}`}
                alt={book.title}
                sx={{ width: 80, height: 80 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6">{book.bookId.title}</Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {book.bookId.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {book.noofdays} days remaining
                  </Typography>
                </>
              }
            />
            <Button
              size="small"
              color="primary"
              onClick={() => handleReturn(book._id, book.isReturned)}
            >
              {book.isReturned ? "Returned" : "Return"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyBooks;
