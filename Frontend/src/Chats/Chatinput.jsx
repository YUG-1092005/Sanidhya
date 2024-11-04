import React from "react";
import "./Chatinput.css";

const Chatinput = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="chat-form" onSubmit={sendMessage}>
      <input
        className="chat-input"
        type="text"
        value={message}
        placeholder="Have doubts???"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="chat-send-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default Chatinput;
