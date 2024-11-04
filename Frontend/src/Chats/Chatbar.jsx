import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Chatbar.css";

const Chatbar = ({ room }) => {
  return (
    <div className="chat-bar">
      <div className="leftInnerChatBar">
        <lord-icon
          src="https://cdn.lordicon.com/lomfljuq.json"
          trigger="hover"
          colors="primary:#ffffff"
          style={{ width: "30px", height: "30px" }}
        ></lord-icon>
        <h3>{room}</h3>
      </div>

      <div className="rightInnerChatBar">
        <Link to={`/expert/list`}>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "#ffffff", padding: "2px", cursor: "pointer" }}
            size="xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default Chatbar;
