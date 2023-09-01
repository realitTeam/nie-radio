import React, { useState, useEffect } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";

import "./style.css";

const ChatHistory = () => {
  const [tickets, setTickets] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = jwtDecode(token);
  const username = tokenPayload.username;

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

  useEffect(() => {
    async function fetchTickets() {
      const ticketsData = await axios.get(`/api/student/tickets/${username}`);
      setTickets(ticketsData.data);
    }
    fetchTickets();
  }, []);

  // Separate tickets with and without replies
  const ticketsWithReplies = tickets.filter((ticket) => ticket.ticket_reply);
  const ticketsWithoutReplies = tickets.filter((ticket) => !ticket.ticket_reply);

  return (
    <>
      <div className="col-md-6">
        <div className="card chat_crd_bg_lgt">
          <div className="card-body">
            <table className="table">
              <tbody>
                {/* Render tickets without replies */}
                {ticketsWithoutReplies.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <div className="text-end">
                        <span className="">{ticket.ticket_content}</span>
                        <br />
                        <span className="text-secondary" style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
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
                    </td>
                  </tr>
                ))}

                {/* Render tickets with replies */}
                {ticketsWithReplies.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <div className="text-start">
                        <span className="text-secondary" style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                          {ticket.ticket_content} <i className="bi bi-reply-fill"></i>
                        </span>
                        <br />
                        <span className="">{ticket.ticket_reply}</span>
                        <br />
                        <span className="text-secondary" style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                          {formatTimestamp(ticket.updatedAt)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
