module.exports = (sequelize, Sequelize) => {
  const Assets = sequelize.define("assets", {
    file_name: {
      type: Sequelize.STRING,
    },
    file_path: {
      type: Sequelize.STRING,
    },
    project_id: {
      type: Sequelize.INTEGER, 
      allowNull: false, 
    },
  });

  Assets.associate = (models) => {
    Assets.belongsTo(models.project);
  };

  return Assets;
};
