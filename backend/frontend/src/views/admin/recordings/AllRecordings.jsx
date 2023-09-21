// AllRecordings.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function AllRecordings() {
    const [recording, setRecording] = useState([]);

    useEffect(() => {
        async function fetchRecordings() {
            const recordingsData = await axios.get('http://localhost:8000/api/admin/recordings');
            setRecording(recordingsData.data);
        }
        fetchRecordings();
    }, []);


    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                {/* breadcrumb/////////////// */}
                <div className="pagetitle">
                    <h1>All Recordings</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Recordings</li>
                        </ol>
                    </nav>
                </div>
                {/* content////////////////////////////////// */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <div className="pt-2 pb-2">
                                    </div>

                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Session</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Grade</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Listen</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recording &&
                                                recording.map((recording) => (
                                                    <tr key={recording.id}>
                                                        <td>  {recording.session_name} </td>
                                                        <td>{recording.session_subject}</td>
                                                        <td>{recording.session_grade}</td>
                                                        <td>
                                                            <td>{recording.session_description}</td>
                                                        </td>
                                                        <td>
                                                            <a href={recording.session_link}>
                                                                <span className="btn btn-sm btn-primary">Listen</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
