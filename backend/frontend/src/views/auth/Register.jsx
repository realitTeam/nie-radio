import { useState } from "react";
import "../../assets/css/auth/Register.css";
import { createStudent } from '../../actions/auth/CreateStudent'

export default function Register() {
    const [formData, setFormData] = useState({});

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        createStudent(formData);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <>
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a
                                            href="/"
                                            className="logo d-flex align-items-center w-auto"
                                        >
                                            <img src="assets/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">NIE Radio</span>
                                        </a>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-2">
                                                <h5 className="card-title text-start pb-0 fs-4">
                                                    <strong>Register</strong>
                                                </h5>
                                                <hr />
                        
                                                <form onSubmit={handleFormSubmit} method="POST" className="row g-3" name="studentForm" id="studentForm">
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
                                                            required
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
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="student_grade" className="form-label">
                                                            Grade <span className="text-danger">*</span>
                                                        </label>
                                                        <select onChange={handleChange} className="form-select" aria-label="Default select example" name="student_grade" id="student_grade">
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
                                                            Email
                                                        </label>
                                                        <input onChange={handleChange}
                                                            type="email"
                                                            name="student_email"
                                                            className="form-control"
                                                            id="student_email"
                                                            required
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
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="password" className="form-label">
                                                            Password <span className="text-danger">*</span>
                                                        </label>
                                                        <input onChange={handleChange}
                                                            type="password"
                                                            name="password"
                                                            className="form-control"
                                                            id="password"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                name="terms"
                                                                type="checkbox"
                                                                value=""
                                                                id="acceptTerms"
                                                                required
                                                            />
                                                            <label className="form-check-label" htmlFor="acceptTerms">
                                                                I agree and accept the{" "}
                                                                <a href="#">terms and conditions</a>
                                                            </label>
                                                            <div className="invalid-feedback">
                                                                You must agree before submitting.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary" type="submit">
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="small mb-0">
                                                            Already have an account?{" "}
                                                            <a href="/login">Log in</a>
                                                        </p>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
