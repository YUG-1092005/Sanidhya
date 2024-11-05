import { React, useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import Chatbar from "./Chatbar";
import "./Chat.css";
import Chatinput from "./Chatinput";
import Messages from "./Messages";
import axios from "axios";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = `${import.meta.env.VITE_CHAT_SERVER_URL}`;

  const location = useLocation();

  //Fetching messages from db
  const fetchMessages = async (room) => {
    const roomId = room;
    try {
      const response = await axios.get(`${ENDPOINT}/chat/messages/${roomId}`);
      console.log("CHAT RESPONSE", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //Joining chat useEffect
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    // Join the room
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log("Error in joining evt:-", error);
      }
    });

    setName(name);
    setRoom(room);
    fetchMessages(room);

    // Clean up the socket connection
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search, ENDPOINT]);

  //Handling messages here
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    // Clean up listener
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <Chatbar room={room} />
        <Messages messages={messages} name={name} />
        <Chatinput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          room={room}
        />
      </div>
    </div>
  );
};

export default Chat;
