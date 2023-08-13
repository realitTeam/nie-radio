import { useState } from "react";
import { login } from '../../actions/auth/LoginUser'

export default function Login() {
    const [formData, setFormData] = useState({});

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        login(formData);
        console.log(formData);
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
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
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
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-start pb-0 fs-4">
                                                    Login
                                                </h5>
                                            </div>

                                            <form onSubmit={handleFormSubmit} method="POST" className="row g-3 needs-validation">

                                                <div className="col-12">
                                                    <label htmlFor="username" className="form-label">Username</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-person-bounding-box"></i></span>
                                                        <input onChange={handleChange} type="email" name="username" className="form-control" id="username" required />
                                                        <div className="invalid-feedback">Please enter your username.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input onChange={handleChange} type="password" name="password" className="form-control" id="password" required />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                    </div>
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
}
