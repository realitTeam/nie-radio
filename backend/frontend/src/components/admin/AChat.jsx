// AChat.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";

import "./achat.css"

const AChat = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const tableContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${formattedHours}:${minutes.toString().padStart(2, "0")}${ampm} | ${day}-${month}-${year}`;
  };

  const fetchUpdatedTickets = async () => {
    try {
      const ticketsData = await axios.get(`/api/admin/tickets`);
      setTickets(ticketsData.data);
    } catch (error) {
      console.error("Error fetching updated tickets", error);
    }
  };

  useEffect(() => {
    async function fetchTickets() {
      const ticketsData = await axios.get(`/api/admin/tickets`);
      setTickets(ticketsData.data);
    }
    fetchTickets();
  }, []);

  useEffect(() => {
    const newSocket = io(``);
    console.log(newSocket);
    var socket_connect = newSocket.on("connect", () => {
      console.log("Connected to WebSocket");
    });
    console.log(socket_connect);
    var socket_msg = newSocket.on("message", (message) => {
      // Handle incoming messages
      fetchUpdatedTickets(); // Update chat list when a new message arrives
    });
    console.log(socket_msg);
    setSocket(newSocket);
    console.log(socket);
    return () => {
      newSocket.disconnect(); // Clean up WebSocket connection on unmount
    };
  }, []);

  // Scroll to the bottom when tickets change
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [tickets]);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/admin/tickets/reply`, formData);
      setFormData({});
      // Send the message via WebSocket
      if (socket) {
        socket.emit("message", "New message"); // Replace with the actual message content
      }
    } catch (error) {
      console.error("Error posting reply", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      ticket_id: selectedTicket._id,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="col-md-12">
        <div className="card chat_crd_bg_lgt">
          <div className="card-body">
            <div ref={tableContainerRef} className="table_container">
              <table className="table">
                <tbody>
                  {tickets &&
                    tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>
                          <span className="text-secondary text-left" style={{ fontSize: 'small', fontWeight: 'bolder', marginTop: '0.5em' }}>
                            {ticket.user_name}
                          </span>
                          <br />
                          <span className="text-left">{ticket.ticket_content}</span>
                          <br />
                          <span className="text-secondary text-left" style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                            {formatTimestamp(ticket.createdAt)}
                          </span>
                        </td>
                        <td className="text-right">
                          <button id="reply" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#replyChatModal" onClick={() => openModal(ticket)}>
                            <i className="bi bi-reply-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTicket && (
        <div className="modal fade" id="replyChatModal" tabIndex="-1" aria-labelledby="replyChatModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body modal_crd_bg_lgt">
                {/* Display the selected ticket's details here */}
                <div className="chat_history">
                  <span>{selectedTicket.ticket_content}</span>
                  <br />
                  <span className="text-secondary text-left" style={{ fontSize: 'small', fontStyle: 'italic', marginTop: '0.5em' }}>
                    {formatTimestamp(selectedTicket.createdAt)}
                  </span>
                </div>
                <div className="chat_reply">
                  <form
                    onSubmit={handleReplySubmit}
                    method="POST"
                    className="row g-1 needs-validation mt-3">
                    <div className="input-group has-validation">
                      <input onChange={handleChange}
                        type="text"
                        name="ticket_reply"
                        className="form-control"
                        id="ticket_reply"
                        value={formData.ticket_reply || ''}
                      />
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend">
                        <button type="submit" className="btn btn-sm btn-success">
                          <i className="bi bi-send-fill"></i>
                        </button>
                      </span>
                      {/* <span
                        className="input-group-text"
                        id="inputGroupPrepend"> */}
                      {/* <a href="tel:+94773728798"> +94 77 372 8798</a> */}
                      {/* <button className="btn btn-sm btn-success">
                          <i className="bi bi-telephone-plus-fill"></i>
                        </button>
                      </span> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )};
    </>
  );
};

export default AChat;
