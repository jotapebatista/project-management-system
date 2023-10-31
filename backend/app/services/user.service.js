const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger, jwtSecret } = require("../../server");

class UserService {
  async registerUser(userData) {
    try {
      const { username, password, full_name, email, access_level } = userData;
  
      // Check if the user already exists
      const existingUser = await userRepository.findByUsername(username);
      if (existingUser) {
        throw new Error("Username is already in use.");
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        username,
        password: hashedPassword,
        full_name,
        email,
        access_level,
      };
  
      const createdUser = await userRepository.createUser(newUser);
  
      const token = jwt.sign({ userId: createdUser.id }, "jwtSecret", {
        expiresIn: "1h", // Token expiration time
      });
  
      console.log("TOKEN:" + token);
  
      return { user: createdUser, token };
    } catch (error) {
      console.error(`[Service] - Error registering user: ${error.message}`);
      throw error; // Re-throw the error for the controller to handle
    }
  }
  

  async loginUser(username, password) {
    try {
      const user = await userRepository.findByUsername(username);

      if (!user) {
        throw new Error("User not found.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password.");
      }

      // After successful login, generate a JWT
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h", // Token expiration time
      });

      return { user, token };
    } catch (error) {
      logger.error(`Error logging user: ${error.message}`);
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await userRepository.findUserById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error) {
      logger.error(`Error finding user by ID: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new UserService();
