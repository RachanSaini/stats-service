const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SessionStat = sequelize.define('SessionStat', {
  sessionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalModulesStudied: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  averageScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timeStudied: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = SessionStat;