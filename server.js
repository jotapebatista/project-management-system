const express = require("express");
const cors = require("cors");
const passport = require("./config/passport.config");
const session = require("express-session");
const winston = require("winston"); // Import Winston

const app = express();
const db = require("./app/models");

let corsOptions = {
  origin: "http://localhost:8081",
};

// Configure Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports.logger = logger;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const initializeDatabase = async () => {
  try {
    await db.sequelize.sync({ force: true });
    logger.info("Drop and re-sync db.");
  } catch (error) {
    logger.error("Database synchronization error:", error);
  }
};

initializeDatabase();

const projectRoutes = require("./app/routes/project.routes");
app.use("/api/projects", projectRoutes);

const userRoutes = require("./app/routes/user.routes");
app.use("/api/user", userRoutes);

const invoiceRoutes = require("./app/routes/invoice.routes");
app.use("/api/invoices", invoiceRoutes);

const assetRoutes = require("./app/routes/asset.routes");
app.use("/api/projects", assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
