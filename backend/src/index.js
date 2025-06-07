const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);

// Associations
User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'user' });

module.exports = { sequelize, User, Task };
