import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./contactdetails.css"

const ContactDetails = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="contact-link">
                            <div className="text-purple">
                                <i className="fas fa-phone-volume"></i>
                                <p className="link-text">+94 117 601 601</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-link">
                            <div className="text-purple">
                                <i className="fas fa-location-dot"></i>
                                <p className="link-text">P.O. Box 21, High Level Rd, Maharagama, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-link">
                            <div className="text-purple">
                                <i className="fas fa-envelope"></i>
                                <p className="link-text">info@nie.edu.lk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactDetails;
