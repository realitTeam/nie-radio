// ANewBlog.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

import Swal from 'sweetalert2';


import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewBlog() {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const displayErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validation checks
        if (!file || !title || !description) {
            displayErrorAlert('All fields are required.');
            return;
        }

        const dataObj = new FormData();
        dataObj.append('post_title', title);
        dataObj.append('post_description', description);
        dataObj.append('file', file);
        setIsLoading(true);
        try {
            const response = await axios.post("/api/admin/blogs/store", dataObj);
            if (response && response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Recording successfully submitted.',
                    timer: 2500, // Display for 3 seconds
                    showConfirmButton: false, // Hide the "OK" button
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle validation error
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please check input values and try again.',
                });
            } else if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Blog post already exist.',
                });
            } else {
                // Handle other server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while submitting. Please try again later.',
                });
            }
        }finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

            if (allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
                setFile(selectedFile);
            } else {
                displayErrorAlert('Insert a valid image.');
                return;
            }
        }
    };

    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>New Blog Post</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">New Post</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} method="POST" className="row g-3 mt-3" name="blogForm" id="blogForm" encType="multipart/form-data">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="title" className="form-label">
                                                Post Title <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">
                                                <input onChange={(e) => setTitle(e.target.value)}
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    id="title"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="description" className="form-label">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea onChange={(e) => setDescription(e.target.value)}
                                                type="text"
                                                name="description"
                                                className="form-control"
                                                id="description" rows={2}></textarea>
                                        </div>
                                        {isLoading && ( // Display loading spinner if isLoading is true
                                            <div className="text-center mt-5">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden"></span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-12">
                                            <label htmlFor="file" className="form-label">
                                                Post Image <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={(e) => setFile(e.target.files[0])}
                                                type="file"
                                                name="file"
                                                className="form-control"
                                                id="file"
                                                accept=".jpg, .jpeg, .png"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                            {isLoading ? "Uploading..." : "Submit"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
