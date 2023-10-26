const express = require("express");
const cors = require("cors");
const passport = require("./config/passport.config");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const userService = require("./app/services/user.service");

const app = express();
const db = require("./app/models");

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize and use the session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define associations within an async function
const initializeDatabase = async () => {
  // Synchronize the database
  try {
    await db.sequelize.sync({ force: true });
    console.log("Drop and re-sync db.");
  } catch (error) {
    console.error("Database synchronization error:", error);
  }
};

initializeDatabase();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const projectRoutes = require("./app/routes/project.routes");
app.use("/api/projects", projectRoutes);

const userRoutes = require("./app/routes/user.routes");
app.use("/api/user", userRoutes);

const invoiceRoutes = require("./app/routes/invoice.routes");
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
