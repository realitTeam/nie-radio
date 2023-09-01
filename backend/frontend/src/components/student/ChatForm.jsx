import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios!
import jwtDecode from "jwt-decode";

import "./style.css";

export default function ChatForm() {
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");
  const tokenPayload = jwtDecode(token);
  const user_email = tokenPayload.username;

  const handleChatForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/student/ticket/store", formData);
      if (response && response.message) {
        alert(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Show the error message in an alert
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      user_email: user_email
    });
  };

  return (
    <div className="col-md-6">
      <div className="card chat_crd_bg_lgt">
        <div className="card-body">
          <form
            onSubmit={handleChatForm}
            method="POST"
            className="row g-1 needs-validation mt-3">
            <div className="col-12">
              <div className="input-group has-validation">
                <input
                  onChange={handleChange}
                  type="text"
                  name="ticket_content"
                  className="form-control"
                  id="ticket_content"
                  required
                />
                <div className="invalid-feedback">Enter a message to send.</div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Send <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

