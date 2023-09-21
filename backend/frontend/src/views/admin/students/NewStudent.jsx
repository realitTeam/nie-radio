// ANewStudent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewStudent() {
    const [formData, setFormData] = useState({});

    const displayErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: message,
        });
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const validReferralCodePattern = /^[A-Za-z]\d{5}$/;
        const validPhonePattern = /^0\d{9}$/;
        if (!formData.refferal_code) {
            displayErrorAlert("Reference ID is required.");
        } else if (!validReferralCodePattern.test(formData.refferal_code)) {
            displayErrorAlert("Invalid Reference ID.");
        } else if (!formData.student_name) {
            displayErrorAlert("Student's name is required.");
        } else if (!formData.student_id) {
            displayErrorAlert("Student ID is required.");
        } else if (!formData.student_grade) {
            displayErrorAlert("Grade is required.");
        } else if (!formData.student_email) {
            displayErrorAlert("Email is required.");
        } else if (!formData.student_phone) {
            displayErrorAlert("Phone is required.");
        } else if (!validPhonePattern.test(formData.student_phone)) {
            displayErrorAlert("Invalid Phone format.");
        } else {
            try {
                const response = await axios.post("/api/admin/students/store",formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Student successfully registered.',
                    timer: 2500, // Display for 3 seconds
                    showConfirmButton: false, // Hide the "OK" button
                }).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    // Handle validation error
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: 'Please check input values and try again.',
                    });
                } else if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Invalid Reference ID.',
                    });
                } else if (error.response && error.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Student already exists.',
                    });
                } else {
                    // Handle other server errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while submitting. Please try again later.',
                    });
                }
            }
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>New Student</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">New Student</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} method="POST" className="row g-3 mt-3" name="studentForm" id="studentForm">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="refferal_code" className="form-label">
                                                School/Organization's Reference ID <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">
                                                <span
                                                    className="input-group-text"
                                                    id="inputGroupPrepend"
                                                >
                                                    <i className="bi bi-upc-scan"></i>
                                                </span>
                                                <input onChange={handleChange}
                                                    type="text"
                                                    name="refferal_code"
                                                    className="form-control"
                                                    id="refferal_code"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="student_name" className="form-label">
                                                Full Name <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={handleChange}
                                                type="text"
                                                name="student_name"
                                                className="form-control"
                                                id="student_name"

                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="student_id" className="form-label">
                                                Student ID <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={handleChange}
                                                type="text"
                                                name="student_id"
                                                className="form-control"
                                                id="student_id"

                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="student_grade" className="form-label">
                                                Grade <span className="text-danger">*</span>
                                            </label>
                                            <select onChange={handleChange} className="form-select" aria-label="Default select example" name="student_grade" id="student_grade">
                                                <option value="0" disabled selected>--select--</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="student_email" className="form-label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={handleChange}
                                                type="email"
                                                name="student_email"
                                                className="form-control"
                                                id="student_email"

                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="student_phone" className="form-label">
                                                Phone <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={handleChange}
                                                type="text"
                                                name="student_phone"
                                                className="form-control"
                                                id="student_phone"

                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary" type="submit">
                                                Submit
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
