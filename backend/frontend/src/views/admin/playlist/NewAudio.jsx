// ANewAudio.jsx
import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewAudio() {
    const [audioName, setAudioName] = useState();
    const [file, setFile] = useState();

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

        const formData = new FormData();
        formData.append('audio_name', audioName);
        formData.append('file', file);

        // Validation checks
        if (!file || !audioName) {
            displayErrorAlert('All fields are required.');
            return;
        }

        try {
            const response = await axios.post("/api/admin/playlist/store", formData);
            if (response && response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Audio successfully stored.',
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
                    text: 'Audio already exist.',
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
    };

    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>New Audio</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">New Audio</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit} method="POST" className="row g-3 mt-3" name="playlistForm" id="playlistForm" encType="multipart/form-data">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="audio_name" className="form-label">
                                                Audio Name <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">
                                                <input
                                                    onChange={(e) => setAudioName(e.target.value)}
                                                    type="text"
                                                    name="audio_name"
                                                    className="form-control"
                                                    id="audio_name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="file" className="form-label">
                                                New Audio for Playlist <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">
                                                <input
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                    type="file"
                                                    name="file"
                                                    className="form-control"
                                                    id="file"
                                                    accept=".mp3, .wav, .mp4, .mkv"
                                                />
                                            </div>
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
