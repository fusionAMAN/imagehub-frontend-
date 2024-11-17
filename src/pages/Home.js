import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon for delete button

export const Home = () => {
    const [userdata, setUserData] = useState([]);

    const handlegetUserdata = async () => {
        const response = await axios.get("https://imagehub-6usk.onrender.com/user/api/getUser").then((res) => res).catch((error) => error);
        if (response.status === 200) {
            setUserData(response.data);
        }
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await axios.delete(`https://imagehub-6usk.onrender.com/user/api/delete/${username}`);
            if (response.status === 200) {
                toast.success("User deleted successfully");
                handlegetUserdata(); // Refresh user data
            }
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    useEffect(() => {
        handlegetUserdata();
    }, []);

    return (
        <Container>
            <h1 className="text-center my-4" style={{ fontWeight: '700', fontSize: '36px', color: '#343a40' }}>
                User Data
            </h1>
            <div className="d-flex justify-content-between flex-wrap">
                {userdata.length > 0 &&
                    userdata.map((element) => (
                        <Card
                            style={{
                                width: "20rem",
                                marginBottom: "20px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease",
                                marginRight: "20px", // Adding space between cards
                            }}
                            key={element._id}
                        >
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold", fontSize: '18px' }}>{element.username}</Card.Title>
                                <button
                                    onClick={() => handleDeleteUser(element.username)}
                                    className="btn btn-danger btn-sm mt-2"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "8px 16px",
                                        fontSize: '14px',
                                    }}
                                >
                                    <FaTrashAlt style={{ marginRight: '8px' }} /> Delete
                                </button>
                            </Card.Body>
                            <div className="d-flex justify-content-start p-3">
                                {element.userprofile.length > 0 &&
                                    element.userprofile.map((ele) => (
                                        <Card.Img
                                            key={ele}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                marginTop: "3px",
                                                objectFit: 'cover',
                                                marginRight: '8px',
                                            }}
                                            src={`https://imagehub-6usk.onrender.com/uploads/${ele}`}
                                        />
                                    ))}
                            </div>
                        </Card>
                    ))}
            </div>
        </Container>
    );
};

export default Home;
