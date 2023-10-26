const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

class UserService {
  async registerUser(userData) {
    const { username, password, full_name, email, access_level } = userData;

    // Check if the user already exists
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username is already in use.');
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

    return userRepository.createUser(newUser);
  }

  async loginUser(username, password) {
   
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password.');
    }

    return user;
  }

  async findUserById(id) {
    const user = await userRepository.findUserById(id);
    return user;
  }

 
}

module.exports = new UserService();
