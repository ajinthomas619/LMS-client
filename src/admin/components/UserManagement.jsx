import axios from "axios";
import React, { useState, useEffect } from "react";
import Datatable from 'react-data-table-component';
import toast from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BASE_URL } from "../../lib/baseUrl";

const UserManagement = () => {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);

    const columns  = [
        {
            name: "No",
            cell: (_row, index) => index + 1
        },
        {
            name: "Name",
            selector: (row) => row.username
        },
        {
            name: "Email",
            selector: (row) => row.email
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    {row.isBlocked === false ? (
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                            onClick={() => handleStatusChange(row._id,true)}>
                            Block
                        </button>
                    ) : (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300"
                            onClick={() => handleStatusChange(row._id,false)}>
                            Unblock
                        </button>
                    )}
                </div>
            )
        },
    ];

    useEffect(() => {
        axios.get(`${BASE_URL}/user/getAllUsers`, { withCredentials: true })
            .then((res) => {
                setData(res.data.data);
                console.log("the data of users",res.data);
                setReload(false);
            })
            .catch((error) => {
                console.error("Error in fetching users", error);
            });
    }, [reload]);

    const handleStatusChange = (userId) => {
        confirmAlert({
            title: "Confirm to Change Status",
            message: "Are you sure to change the status of this user?",
            buttons: [
                {
                    label: "Change",
                    onClick: () => {
                                                                    
                        axios.post(`${BASE_URL}/user/changeuserstatus`, { userId }, { withCredentials: true })
                            .then((res) => {
                                console.log("the response of blockkk",res)
                                setReload(true);
                                if (res.data.data.isBlocked) {
                                    toast.success(`${res.data.user.username} blocked`);
                                } else {
                                    toast.success(`${res.data.user.username} unblocked`);
                                }
                            })
                            .catch((error) => {
                                
                                console.error("Error in changing user status", error);
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

export default UserManagement;
