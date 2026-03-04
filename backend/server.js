require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const careerRoutes = require("./routes/careerRoutes");
const chatRoutes = require("./routes/chatRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const appPort = Number(process.env.APP_PORT || process.env.PORT) || 5001;

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/career", careerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Personalized Career Guidance System API is running!" });
});

function startServer(port, remainingAttempts) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Change APP_PORT in backend/.env or stop the existing process.`);
    } else {
      console.error("Server startup error:", error.message);
    }
    process.exit(1);
  });
}

startServer(appPort);
