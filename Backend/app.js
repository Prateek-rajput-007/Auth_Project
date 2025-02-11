require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const router = require("./src/routes/user-routes");

// Load environment variables
const { PORT = 5000, CLIENT_URL } = process.env;

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Ensure cookie-parser is used

// Routes
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
