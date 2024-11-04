const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const messageModel = require("../models/messageModel.js");
const messageRouter = require("./Routes/messageRouter.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../.env" });
const connectDB = require("../config/db.cjs");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./Users.js");

connectDB();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  credentials: true,
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Chat endpoint
app.use("/chat", messageRouter);

io.on("connection", (socket) => {
  console.log("Device connected");

  socket.on("join", async ({ name, room }, callback) => {
    room = Number(room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      if (typeof callback === "function") {
        return callback(error);
      }
    }

    const messages = await messageModel
      .find({ roomId: room })
      .sort({ timestamp: 1 });
    // Emit the existing messages to the newly joined user
    socket.emit("previousMessages", messages);

    // Admin generated message
    socket.emit("message", {
      user: "admin",
      content: `${user.name} welcome to room ${room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      content: `${user.name} has joined the chat`,
    });

    socket.join(user.room);

    //to know which user is in a room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    if (typeof callback === "function") {
      callback();
    } else {
      console.warn("Callback is not provided or not a function for 'join'");
    }
  });

  socket.on("sendMessage", async (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      const newMessage = new messageModel({
        roomId: user.room,
        sender: user.name,
        content: message,
      });
      await newMessage.save();
      // To broadcast message to all clients connected to a specific room
      io.to(user.room).emit("message", {
        sender: user.name,
        content: message,
        roomId: user.room,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      if (typeof callback === "function") {
        callback();
      } else {
        console.warn(
          "Callback is not provided or not a function for 'sendMessage'"
        );
      }
    } else {
      console.error("User not found for socket ID", socket.id);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        content: `${user.name} has left.`,
      });
    }
    console.log("Device disconnected");
  });
});

const port = process.env.VITE_CHAT_PORT;

server.listen(port, () => {
  console.log(`Chat server listening on port ${port}`);
});
