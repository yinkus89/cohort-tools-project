const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Import routes
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");
const { authRoutes } = require("./routes/auth.routes");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Debugging: log the type of imported routes
// console.log('cohortRoutes:', cohortRoutes);
// console.log('studentRoutes:', studentRoutes);
// console.log('authRoutes:', authRoutes);

// Use routes
app.use("/api/cohorts", cohortRoutes); // Mount the cohort routes
app.use("/api/students", studentRoutes); // Mount the student routes
app.use("/api/auth", authRoutes); // Mount the auth routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Cohort Tools API!");
});

// Error handling for 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
