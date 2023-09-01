// ANewRecording.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewRecording() {
    const [formData, setFormData] = useState({});

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("/api/admin/recordings/store", formData);
            if (response && response.message) {
                alert(response.message);
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error)
                alert(error.response.data.message); // Show the error message in an alert
            } else {
                alert("An error occurred. Please try again later.");
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
                    <h1>New Session</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">New Session</li>
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
                                            <label htmlFor="session_name" className="form-label">
                                                Session Name <span className="text-danger">*</span>
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
                                                    name="session_name"
                                                    className="form-control"
                                                    id="session_name"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="session_subject" className="form-label">
                                                Subject
                                            </label>
                                            <input onChange={handleChange}
                                                type="text"
                                                name="session_subject"
                                                className="form-control"
                                                id="session_subject"
                                                required
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="session_grade" className="form-label">
                                                Grade
                                            </label>
                                            <select onChange={handleChange} className="form-select" aria-label="Default select example" name="session_grade" id="session_grade">
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
                                            <input onChange={handleChange}
                                                type="text"
                                                name="session_language"
                                                className="form-control"
                                                id="session_language"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="session_link" className="form-label">
                                                Session Link <span className="text-danger">*</span>
                                            </label>
                                            <input onChange={handleChange}
                                                type="text"
                                                name="session_link"
                                                className="form-control"
                                                id="session_link"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="session_description" className="form-label">
                                                Description
                                            </label>
                                            <textarea onChange={handleChange}
                                                type="text"
                                                name="session_description"
                                                className="form-control"
                                                id="session_description" rows={2}></textarea>
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
