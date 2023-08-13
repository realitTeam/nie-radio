import { useState, useEffect } from "react";

import Header from "../../../components/moderator/layouts/Header";
import SideBar from "../../../components/moderator/layouts/SideBar";
import Footer from "../../../components/moderator/layouts/Footer";

export default function NewStudent() {
    const [studentName, setStudentName] = useState("");
    const [studentPhone, setStudentPhone] = useState("");
    const [username, setUsername] = useState("");

    const handleUsernameGeneration = () => {
        const username = studentName.substring(0, 5) + studentPhone.slice(-3);
        setUsername(username);
    };

    useEffect(() => {
        handleUsernameGeneration();
    }, [studentName, studentPhone]);

    
    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                {/* breadcrumb/////////////// */}
                <div className="pagetitle">
                    <h1>New Student</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item">Students</li>
                            <li className="breadcrumb-item active">New</li>
                        </ol>
                    </nav>
                </div>
                {/* content////////////////////////////////// */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-start pb-0 fs-4">
                                            New Student
                                        </h5>
                                    </div>

                                    <form action="" className="row g-3" name="studentForm" id="studentForm">
                                        <div className="col-12 mb-2">
                                            <label for="refferal_code" className="form-label">
                                                School/Organization's Reference ID
                                            </label>
                                            <div className="input-group has-validation">
                                                <span
                                                    className="input-group-text"
                                                    id="inputGroupPrepend"
                                                >
                                                    <i className="bi bi-upc-scan"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="refferal_code"
                                                    className="form-control"
                                                    id="refferal_code"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label for="student_name" className="form-label">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="student_name"
                                                className="form-control"
                                                id="student_name"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label for="student_id" className="form-label">
                                                Student ID
                                            </label>
                                            <input
                                                type="text"
                                                name="student_id"
                                                className="form-control"
                                                id="student_id"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label for="student_grade" className="form-label">
                                                Grade
                                            </label>
                                            <input
                                                type="text"
                                                name="student_grade"
                                                className="form-control"
                                                id="student_grade"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label for="student_email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="student_email"
                                                className="form-control"
                                                id="student_email"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label for="student_phone" className="form-label">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                name="student_phone"
                                                className="form-control"
                                                id="student_phone"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label for="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                required
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
            {/* <Footer /> */}
        </>
    )
}
