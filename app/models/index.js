const dbConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Project = require("./project.model.js")(sequelize, Sequelize);
db.Invoice = require("./invoice.model.js")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.Assets = require("./assets.model")(sequelize, Sequelize);

db.Project.hasMany(db.Invoice, { foreignKey: 'project_id' });
db.Project.hasMany(db.Assets, { foreignKey: 'project_id' });

module.exports = db;
