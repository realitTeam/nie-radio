import React, { useState, useEffect, useRef  } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";

import "./style.css";

const StudentChat = () => {
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem("token");
    const tokenPayload = jwtDecode(token);
    const username = tokenPayload.username;
    const user_email = tokenPayload.username;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        const day = date.getDate();
        const month = date.getMonth() + 1; // Adding 1 since months are 0-indexed
        const year = date.getFullYear();

        return `${formattedHours}:${minutes.toString().padStart(2, "0")}${ampm} | ${day}-${month}-${year}`;
    };

    const listRef = useRef(null);

    useEffect(() => {
        async function fetchTickets() {
            const ticketsData = await axios.get(`/api/student/tickets/${username}`);
            setTickets(ticketsData.data);

            // Scroll to the bottom of the list when tickets are updated
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        }
        fetchTickets();
    }, [username]);

    const sortedTickets = tickets.slice().sort((a, b) => a.createdAt - b.createdAt);

    const handleChatForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/student/ticket/store", formData);
            if (response && response.data.message) {
                // After successfully sending the message, fetch the updated ticket list
                const updatedTicketsData = await axios.get(`/api/student/tickets/${username}`);
                setTickets(updatedTicketsData.data);

                // Reset the form to clear the ticket_content input field
                e.target.reset();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
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
        <>
            <div className="chat-container">
                <div className="card chat_crd_bg_lgt">
                    <div className="card-body">
                        <table className="table" ref={listRef}>
                            <tbody>
                                {sortedTickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>
                                            <div className="text-end">
                                                <span className="">{ticket.ticket_content}</span>
                                                <br />
                                                <span className="text-secondary " style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                                                    {formatTimestamp(ticket.createdAt)}
                                                </span>&nbsp;
                                                <span className={`${ticket.ticket_status === "in-progress" ? "text-secondary" : "text-primary"}`}>
                                                    {ticket.ticket_status === "in-progress" ? (
                                                        <i className="bi bi-check"></i>
                                                    ) : (
                                                        <i className="bi bi-check-all"></i>
                                                    )}
                                                </span>
                                            </div>

                                            {ticket.ticket_reply && (
                                                <div className="text-start">
                                                    <span className="text-secondary " style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                                                        {ticket.ticket_content} <i className="bi bi-reply-fill"></i>
                                                    </span>
                                                    <br />
                                                    <span className="">{ticket.ticket_reply}</span>
                                                    <br />
                                                    <span className="text-secondary " style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                                                        {formatTimestamp(ticket.updatedAt)}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <form
                            onSubmit={handleChatForm}
                            method="POST"
                            className="row g-1 needs-validation mt-3">
                            <div className="col-12">
                                <div class="input-group my-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="ticket_content"
                                        className="form-control form-control-sm"
                                        id="ticket_content"
                                        required
                                    />
                                    <span class="input-group-text" id="basic-addon2">
                                        <button className="btn " type="submit">
                                            <i className="bi bi-send-fill btn-primary"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentChat;
