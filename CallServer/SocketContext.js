const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");
const expertVideoId = require("./expertVideoModel");
const connectDB = require("./db.cjs");
require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: `https://sanidhya-co.netlify.app/`,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.options("*", cors()); 
const PORT = process.env.VITE_PEER_JS_PORT;

connectDB();

const peerServer = ExpressPeerServer(app.listen(PORT), {
  debug: true,
});

app.use("/", peerServer);

app.get("/connect/check-expert/:id", async (req, res) => {
  try {
    const expert = await expertVideoId.findOne({ expertId: req.params.id });
    if (expert) {
      return res.json({
        exists: true,
        expertId: expert.expertId,
        expertName: expert.expertName,
        meetingId: expert.meetingId, 
      });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking expert:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to save the expert details
app.post("/connect/save-expert", async (req, res) => {
  const { expertId, expertName, meetingId } = req.body;
  console.log("USERID FOR EXPERT", meetingId);

  try {
    let expert = await expertVideoId.findOne({ expertId });
    if (expert) {
      return res.status(400).json({ message: "Expert already exists." });
    }

    expert = new expertVideoId({
      expertId,
      expertName,
      meetingId,
    });

    await expert.save();
    return res.json({ success: true, message: "Expert saved successfully!" });
  } catch (error) {
    console.error("Error saving expert:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Handle errors
peerServer.on("connection", (client) => {
  console.log("Client connected:", client);
});

peerServer.on("disconnect", (client) => {
  console.log("Client disconnected:", client);
});

console.log(`Video Call Server is running on http://localhost:${PORT}`);
