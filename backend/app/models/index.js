const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.equipments = require("./equipments.model")(sequelize, Sequelize);
db.workers = require("./workers.model")(sequelize, Sequelize);
db.operationsList = require("./operationsList.model")(sequelize, Sequelize);
db.roles = require("./roles.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
db.createdReports = require("./createdReports.model")(sequelize, Sequelize);
db.serviceOrganizations = require("./serviceOrganizations.model")(sequelize, Sequelize);

module.exports = db;
