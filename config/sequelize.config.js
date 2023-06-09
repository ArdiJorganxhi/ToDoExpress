const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.tasks = require("../models/task.model.js")(sequelize, Sequelize);

db.users.hasMany(db.tasks, {
  foreignKey: "user_id",
  as: "tasks",
});

db.tasks.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;
