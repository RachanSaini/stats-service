const SessionStat = require('../models/SessionStat');
const sequelize = require('../config/database')

const createSessionStat = async (statData) => {
    return await SessionStat.create(statData);
};

const getCourseStats = async (courseId, userId) => {
    const courseStats = await SessionStat.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalModulesStudied')), 'totalModulesStudied'],
        [sequelize.fn('AVG', sequelize.col('averageScore')), 'averageScore'],
        [sequelize.fn('SUM', sequelize.col('timeStudied')), 'timeStudied'],
      ],
      where: { courseId, userId },
    });
    return courseStats[0];
};


const getSessionStat = async (sessionId) => {
    return await SessionStat.findByPk(sessionId);
};
  
module.exports = { createSessionStat, getCourseStats, getSessionStat };