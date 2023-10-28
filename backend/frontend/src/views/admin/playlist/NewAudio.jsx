// ANewAudio.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Howl } from 'howler';

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function ANewAudio() {
    const [files, setFiles] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0); // Total duration in seconds
    const [isLoading, setIsLoading] = useState(false);

    const displayErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    };

    const updateTotalDuration = async (selectedFiles) => {
        let duration = 0;
        for (const file of selectedFiles) {
            const fileDuration = await getAudioFileDuration(file);
            duration += fileDuration;
        }
        setTotalDuration(duration);
    };

    const getAudioFileDuration = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const audio = new Howl({
                    src: [event.target.result],
                    onload: () => {
                        resolve(Math.round(audio.duration()));
                    },
                    onend: () => {
                        audio.unload();
                    },
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    useEffect(() => {
        // Update the total duration whenever files change
        updateTotalDuration(files);
    }, [files]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        // Validation checks
        if (files.length === 0) {
            displayErrorAlert('Please select at least one audio file.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("/api/admin/playlist/store", formData);
            if (response && response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Audio successfully stored.',
                    timer: 2500,
                    showConfirmButton: false,
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
        } finally {
            setIsLoading(false);
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
                                    <div className="progress mt-3" role="progressbar" aria-label="Total Progress" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" style={{ width: `${(totalDuration / 21600) * 100}%`, height: "20px" }}>
                                            {Math.round((totalDuration / 3600) * 100) / 100} hours
                                        </div>
                                    </div>
                                    <form onSubmit={handleFormSubmit} method="POST" className="row g-3 mt-3" name="playlistForm" id="playlistForm" encType="multipart/form-data">
                                        {isLoading && (
                                            <div className="text-center mt-5">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden"></span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-12 mb-2">
                                            <label htmlFor="file" className="form-label">
                                                Add Files <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group has-validation">
                                                <input
                                                    onChange={(e) => setFiles([...files, ...e.target.files])}
                                                    type="file"
                                                    name="files"
                                                    className="form-control"
                                                    id="file"
                                                    accept=".mp3"
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <div className="">
                                                <ul className="list-group-flush">
                                                    {files.map((file, index) => (
                                                        <li key={index}>
                                                            {file.name}
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm"
                                                                onClick={() => removeFile(index)}>
                                                                <i className="bi bi-x-circle-fill text-danger"></i>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
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
