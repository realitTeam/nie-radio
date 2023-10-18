// ANewRecording.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewRecording() {
    const [sessionName, setSessionName] = useState('');
    const [streamingDate, setStreamingDate] = useState('');
    const [streamingTime, setStreamingTime] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [language, setLanguage] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

        const formData = new FormData();
        formData.append('session_name', sessionName);
        formData.append('streaming_date', streamingDate);
        formData.append('streaming_time', streamingTime);
        formData.append('session_subject', subject);
        formData.append('session_grade', grade);
        formData.append('session_language', language);
        formData.append('file', file);
        // Validation checks
        if (!sessionName) {
            displayErrorAlert('Session Name is required.');
            return;
        }
        if (!streamingDate) {
            displayErrorAlert('Streaming Date is required.');
            return;
        }
        if (!streamingTime) {
            displayErrorAlert('Streaming Time is required.');
            return;
        }
        if (!file) {
            displayErrorAlert('Recording File is required.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("/api/admin/recordings/store", formData);
            if (response && response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Recording successfully uploaded.',
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
                    text: 'Session already exist.',
                });
            } else {
                // Handle other server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while submitting. Please try again later.',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value,
    //     });
    // }

    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>New Session</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Recordings</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} method="POST" className="row g-3 mt-3" name="studentForm" id="studentForm">
                                        <div className="col-6 mb-2">
                                            <label htmlFor="session_name" className="form-label">
                                                Session Name <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">

                                                <input onChange={(e) => setSessionName(e.target.value)}
                                                    type="text"
                                                    name="session_name"
                                                    className="form-control"
                                                    id="session_name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <label htmlFor="streaming_date" className="form-label">
                                                Streaming Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">

                                                <input onChange={(e) => setStreamingDate(e.target.value)}
                                                    type="date"
                                                    name="streaming_date"
                                                    className="form-control"
                                                    id="streaming_date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <label htmlFor="streaming_time" className="form-label">
                                                Streaming Time <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">

                                                <input onChange={(e) => setStreamingTime(e.target.value)}
                                                    type="time"
                                                    name="streaming_time"
                                                    className="form-control"
                                                    id="streaming_time"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="session_subject" className="form-label">
                                                Subject
                                            </label>
                                            <input onChange={(e) => setSubject(e.target.value)}
                                                type="text"
                                                name="session_subject"
                                                className="form-control"
                                                id="session_subject"

                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="session_grade" className="form-label">
                                                Grade
                                            </label>
                                            <select onChange={(e) => setGrade(e.target.value)} className="form-select" aria-label="Default select example" name="session_grade" id="session_grade">
                                                <option defaultValue="0" disabled selected>--select--</option>
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
                                        <div className="col-4">
                                            <label htmlFor="session_language" className="form-label">
                                                Language
                                            </label>
                                            <select onChange={(e) => setLanguage(e.target.value)} className="form-select" aria-label="Default select example" name="session_language" id="session_language">
                                                <option defaultValue="0" disabled selected>--select--</option>
                                                <option value="Sinhala">Sinhala</option>
                                                <option value="English">English</option>
                                                <option value="Tamil">Tamil</option>
                                            </select>
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
                                                Recording File <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={(e) => setFile(e.target.files[0])}
                                                type="file"
                                                name="file"
                                                className="form-control"
                                                id="file"
                                                accept=".mp3"
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
