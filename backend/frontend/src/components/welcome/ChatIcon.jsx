// ChatIcon.js

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link
import chaticon from "./conversation.png";
import "./chaticon.css";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState(""); // State to store the user's message

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return; // Prevent sending empty messages
    }

    // Handle sending the message (you can customize this part)

    // Clear the message input field
    setMessage("");
  };

  return (
    <>
      <div className="chat-icon">
        <button className="chat-btn" onClick={toggleChat}>
          <img src={chaticon} alt="Chat" />
        </button>
      </div>

      {/* Render the chat window as a popup */}
      {isChatOpen && (
        <div className="popup">
          <div className="popup-content">
            {/* Input field and send button */}
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleInputChange}
              />
             <Link to="/login">
                <button onClick={handleSendMessage}>
                  <i className="bi bi-send-fill"></i>
                </button>
              </Link>
              <button onClick={toggleChat}><i class="bi bi-x"></i></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatIcon;
