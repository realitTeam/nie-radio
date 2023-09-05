// Login.jsx
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({});

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate the form fields
        if (!formData.username || !formData.password) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in both username and password.',
            });
            return;
        };
        try {
            const response = await axios.post("/api/login", formData);
            const token = response.data.token;
            const role = response.data.role; // Get the role from the response

            localStorage.setItem("token", token);

            onLogin(token);

            // Redirect to the relevant dashboard based on user role
            if (token) {
                if (role === "admin") {
                    // Redirect to admin dashboard
                    window.location.href = "/admin"; // Redirect using window.location
                } else if (role === "moderator") {
                    // Redirect to moderator dashboard
                    window.location.href = "/moderator"; // Redirect using window.location
                } else if (role === "student") {
                    // Redirect to student dashboard
                    window.location.href = "/student"; // Redirect using window.location
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle validation error
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please check your username and password and try again.',
                });
            } else {
                // Handle other server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'An error occurred while logging in. Please try again later.',
                });
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
            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a href="/" className="logo d-flex align-items-center w-auto">
                                            <img src="assets/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">NIE RADIO</span>
                                        </a>
                                    </div>
                                    <div className="card lgn_crd_bg_lgt">
                                        <div className="card-body">
                                            <div className="pt-2">
                                                <h5 className="card-title text-start pb-0 fs-4">
                                                    Login
                                                </h5>
                                            </div>
                                            <hr />
                                            <form onSubmit={handleLogin} method="POST" className="row g-3 needs-validation">

                                                <div className="col-12">
                                                    <label htmlFor="username" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-person-bounding-box"></i></span>
                                                        <input onChange={handleChange} type="email" name="username" className="form-control" id="username"  />
                                                        <div className="invalid-feedback">Please enter your username.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input onChange={handleChange} type="password" name="password" className="form-control" id="password"  />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have account? <a href="/register">Create an account</a></p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
};

export default Login;