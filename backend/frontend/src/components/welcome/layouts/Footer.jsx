import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <footer class="text-center bg-pi-li text-lg-start text-muted footer_style">
                <section class="bg-pi-dk d-flex justify-content-center justify-content-lg-between p-4 border-bottom ftr_lbls">
                    <div class="me-5 d-none d-lg-block">
                        <span></span>
                    </div>
                    <div>
                        <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-twitter"></i>
                        </Link>
                        <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-google"></i>
                        </Link>
                        <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-instagram"></i>
                        </Link>
                        <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-linkedin"></i>
                        </Link>
                        {/* <Link to="/" class="me-4 text-reset">
                            <i class="fab fa-github"></i>
                        </Link>  */}
                    </div>
                </section>
                <section class="">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">National Institute of Education
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer
                                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>
                            {/* <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Products</h6>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Angular
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        React
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Vue
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Laravel
                                    </a>
                                </p>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Messenger
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Programs
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        3D Radio
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Blog
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">
                                        Contact Us
                                    </a>
                                </p>
                            </div> */}
                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i class="fas fa-home me-3"></i> P.O. Box 21, High Level Rd, Maharagama, Sri Lanka
                                </p>
                                <p>
                                    <i class="fas fa-envelope me-3"></i>
                                    info@nie.edu.lk
                                </p>
                                <p>
                                    <i class="fas fa-phone me-3"></i> +94 117 601 601
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="text-center p-4">
                    Copyright © 2023 - National Institute of Education -
                    <a class="text-reset fw-bold" href="#">
                        Designed and Implemented by Yuwan Audio Visuals
                    </a>
                    <a class="text-reset fw-bold" href="https://realit.lk">
                        - Developed By Real IT PVT LTD
                    </a>
                </div>
            </footer>
        </>
    );
};

export default Footer;
