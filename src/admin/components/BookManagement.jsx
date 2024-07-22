import axios from "axios";
import React, { useState, useEffect } from "react";
import Datatable from 'react-data-table-component';
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BASE_URL } from "../../lib/baseUrl";
import { Button } from "@mui/material";

const BookManagement = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);

    const columns  = [
        {
            name: "No",
            cell: (_row, index) => index + 1
        },
        {
            name: "Title",
            selector: (row) => row.title
        },
        {
            name: "Author",
            selector: (row) => row.author
        },
        {
          name:"copies",
          selector: (row) => row.copies
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
              <Button  onClick={() => handleStatusChange(row._id)}  sx={{ fontSize: '0.75rem' }}>
                Delete
              </Button>
                </div>
            )
        },
    ];

    useEffect(() => {
        axios.get(`${BASE_URL}/books/show-books`, { withCredentials: true })
            .then((res) => {
                setData(res.data.data);
                console.log("the data of books",res.data);
                setReload(false);
            })
            .catch((error) => {
                console.error("Error in fetching books", error);
            });
    }, [reload]);

    const handleStatusChange = (bookId) => {
        console.log("the book id",bookId)
        confirmAlert({
            title: "Confirm to Delete",
            message: "Are you sure to delete this book?",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => {
                                                                    
                        axios.delete(`${BASE_URL}/books/delete-book/${bookId}`, { withCredentials: true })
                            .then((res) => {
                                console.log("the response of delete book",res)
                                setReload(true);
                           
                            })
                            .catch((error) => {
                                
                                console.error("Error in deleting book", error);
                            });
                    }
                },
                {
                    label: "Cancel",
                }
            ]
        });
    };

    return (
        <div className="flex flex-col items-center">
          
            <div className="w-full mt-16 px-36  justify-center">
                <Datatable columns={columns} data={data} pagination highlightOnHover />
            </div>
        </div>
    );
};

export default BookManagement;
