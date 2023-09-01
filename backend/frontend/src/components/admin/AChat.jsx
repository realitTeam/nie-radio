import React, { useState, useEffect } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";

const AChat = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // To track the selected ticket for the modal
  const [formData, setFormData] = useState({});

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

  // Function to fetch updated ticket list
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

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Function to handle form submission
  const handleReplySubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`/api/admin/tickets/reply`, formData);
      // Clear the formData state
      setFormData({});
      // Fetch updated tickets
      fetchUpdatedTickets();
    } catch (error) {
      console.error("Error posting reply", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      ticket_id : selectedTicket._id,
      [e.target.id]: e.target.value
    });
  }

  return (
    <>
      <div className="col-md-12">
        <div className="card chat_crd_bg_lgt">
          <div className="card-body">
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
                        <button id="reply" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(ticket)}>
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

      {/* Modal */}
      {selectedTicket && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        value={formData.ticket_reply || ''} // Set the value of the input
                      />
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend">
                        <button type="submit" className="btn btn-sm btn-success">
                          <i className="bi bi-send-fill"></i>
                        </button>
                      </span>
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend">
                        <button className="btn btn-sm btn-success">
                          <i class="bi bi-telephone-plus-fill"></i>
                        </button>
                      </span>
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
