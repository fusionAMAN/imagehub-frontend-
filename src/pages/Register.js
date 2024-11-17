import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Register = () => {
    const [username, setUserName] = useState('');
    const [files, setFiles] = useState([]);

    const handleChange = (event) => {
        setUserName(event.target.value);
    };

    const handleFileChange = (event) => {
        let selectedFiles = [];
        for (let item of event.target.files) {
            selectedFiles.push(item);
        }
        setFiles(selectedFiles);
    };

    const handleDeleteImage = (index) => {
        // Remove the image at the given index
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append('username', username);

        // Append all selected files to form data
        files.forEach((file) => {
            formData.append('userimg', file);
        });

        try {
            const response = await axios.post('https://imagehub-6usk.onrender.com/user/api/register', formData, config);

            if (response && response.status === 200) {
                setUserName('');
                setFiles([]); // Clear files after successful upload
                toast.success('Images successfully uploaded');
            } else {
                toast.error('Unexpected response format or status.');
            }
        } catch (error) {
            console.error('Request failed:', error);

            if (error.response && error.response.data) {
                toast.error(error.response.data.error || 'An error occurred on the server.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Container style={{ marginTop: '10px' }}>
                <h1 className="text-center">Upload Multiple Images</h1>
                <div className="d-flex flex-column justify-content-center">
                    <Form className="w-50">
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={handleChange}
                                placeholder="Enter Username"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Select Images</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} multiple />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>

                {/* Image Preview and Delete */}
                {files.length > 0 && (
                    <Container className="mt-3 d-flex justify-content-center flex-wrap">
                        {files.map((file, index) => (
                            <Card
                                key={index}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '5px',
                                    position: 'relative',
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={URL.createObjectURL(file)}
                                    alt="Image Preview"
                                    style={{ height: '100%', objectFit: 'cover' }}
                                />
                                <Button
                                    variant="danger"
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                        borderRadius: '50%',
                                    }}
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    X
                                </Button>
                            </Card>
                        ))}
                    </Container>
                )}
            </Container>
        </>
    );
};

export default Register;
