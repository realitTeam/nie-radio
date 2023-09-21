import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./inquireform.css"

const InquireForm = () => {
    return (
        <>
            <div className="container">
                <div className="section_title_dark mt-2 mb-5">
                    <p>INQUIRE NOW</p>
                </div>
                <form method="POST" className="row g-3 needs-validation">
                    <div className="row my-1">
                        <div className="col-6">
                            <label htmlFor="inquire_full_name" className="form-label">Full Name</label>
                            <input type="text" name="inquire_full_name" className="form-control" id="inquire_full_name" />
                            <div className="invalid-feedback">Full Name is required!</div>
                        </div>
                        <div className="col-6">
                        <label htmlFor="inquire_phone" className="form-label">Phone</label>
                            <input type="number" name="phone" className="form-control" id="inquire_phone" />
                            <div className="invalid-feedback">Phone is required!</div>
                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-6">
                            <label htmlFor="inquire_email_address" className="form-label">Email Address</label>
                            <input type="email" name="inquire_email_address" className="form-control" id="inquire_email_address" />
                            <div className="invalid-feedback">Email Address is required!</div>
                        </div>
                        <div className="col-6">
                        <label htmlFor="inquire_subject" className="form-label">Subject</label>
                            <input type="text" name="inquire_subject" className="form-control" id="inquire_subject" />
                            <div className="invalid-feedback">Subject is required!</div>
                        </div>
                    </div>
                    <div className="row  my-1">
                        <div className="col-12">
                            <label htmlFor="inquire_message" className="form-label">Message</label>
                            <textarea type="text" name="inquire_message" className="form-control" id="inquire_message" rows="2"></textarea>
                            <div className="invalid-feedback">Message is required!</div>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn btn-primary btn_inquire" type="submit">INQUIRE</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InquireForm;
