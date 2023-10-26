const db = require("../models");
const User = db.User;

class UserRepository {
  createUser(newUser) {
    return User.create(newUser);
  }

  findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  findUserById(id) {
    return User.findByPk(id);
  }
  
}

module.exports = new UserRepository();
