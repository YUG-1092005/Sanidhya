import React from "react";
import ScrollToBar from "react-scroll-to-bottom";
import Message from "./Message.jsx";
import "./Messages.css";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBar className="messages">
      {messages.map((message, index) => (
        <div>
          <Message
            key={message._id}
            message={{ user: message.sender, text: message.content }}
            name={name}
          />
        </div>
      ))}
    </ScrollToBar>
  );
};

export default Messages;
