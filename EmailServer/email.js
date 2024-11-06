const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/../.env" });
const workshopRegistrationModel = require("./workshopRegistration");
const connectDB = require("./db.cjs");

const PORT = process.env.VITE_EMAIL_PORT;

connectDB();

app.use(
  cors({
    origin: `https://sanidhya-official.netlify.app/`,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());

//Workshop registration
app.post("/sanidhya/workshop/registration", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const attendesOfWorkshop = new workshopRegistrationModel({
    attendeIdentification: name,
    email: email,
  });

  await attendesOfWorkshop.save();

  //Nodemailer configuration
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.VITE_EMAIL_USER,
      pass: process.env.VITE_EMAIL_PASS,
    },
  });

  // Email sending options
  let mailOptions = {
    from: process.env.VITE_EMAIL_USER,
    to: email,
    encoding: "utf-8",
    subject: "Workshop Registration Confirmation",
    html: `
    <div>
      <p>Hello ${name},</p>

      <p>Thank you for registering for our upcoming workshop! We are honored to have you as part of this initiative dedicated to supporting the physically and visually impaired community.</p>
        
      <p>This workshop aims to create meaningful connections between organizations like yours and experts who are committed to making a difference. Here’s what you can look forward to:</p>
        
      <ul>
        <li><strong>Insightful sessions:</strong> Gain knowledge from experts who specialize in accessibility, technology, and support for the visually and physically impaired.</li>
        <li><strong>Interactive discussions:</strong> Engage in dialogues that foster collaboration and new ideas to enhance the lives of those we serve.</li>
        <li><strong>Networking opportunities:</strong> Connect with other organizations, share your experiences, and explore potential collaborations.</li>
      </ul>
        
      <p>We will send you further details, including the workshop access links if online, closer to the event date. If you have any questions or need assistance, please do not hesitate to reach out to us at <a href="mailto:sanidhya09205@gmail.com">sanidhya09205@gmail.com</a>.</p>
        
      <p>Thank you for your dedication and partnership in this important work. We look forward to an inspiring and productive workshop!</p>
        
      <p>Warm regards,</p>
      <p>Team Sanidhya</p>
      <div>
    `,
  };

  // Sending email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

//Contact us from various pages
app.post("/sanidhya/contactus", (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.VITE_EMAIL_USER,
      pass: process.env.VITE_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.VITE_EMAIL_USER,
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Error: " + error.message });
    }
    res.status(200).send({ message: "Message sent successfully!" });
  });
});

// Logging CORS Requests
app.use((req, res, next) => {
  console.log(`CORS Request: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Email Server listening on ${PORT}`);
});
