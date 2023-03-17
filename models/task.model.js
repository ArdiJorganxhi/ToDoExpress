const { sequelize, Sequelize } = require("./sequelize.config");

module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    content: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Task;
};
