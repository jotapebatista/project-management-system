const userService = require("../services/user.service");
const { logger } = require("../../server");

exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    logger.info(`New user registered: ${user.username}`);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.loginUser(username, password);
    logger.info(`${username} logged in successfully.`);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    logger.error(`Error logging in for user ${username}: ${error.message}`);
    res.status(401).json({ error: error.message });
  }
};