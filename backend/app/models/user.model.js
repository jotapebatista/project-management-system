module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    access_level: {
      type: Sequelize.ENUM,
      values: ['admin', 'readonly', 'nologin'],
      allowNull: false,
    },
  });

  return User;
};
