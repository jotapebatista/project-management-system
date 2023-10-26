module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["Not Started", "In Progress", "Completed", "Waiting"],
    },
    client_name: {
      type: Sequelize.STRING,
    },
    budget: {
      type: Sequelize.FLOAT,
    },
  });

  return Project;
};
