const { createSessionStat, getCourseStats, getSessionStat } = require('../services/statService');

const postCourseStat = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { sessionId, totalModulesStudied, averageScore, timeStudied } = req.body;
    const userId = req.header('userId');

    const sessionStat = await createSessionStat({
      sessionId,
      userId,
      courseId,
      totalModulesStudied,
      averageScore,
      timeStudied,
    });

    res.status(201).json(sessionStat);
  } catch (error) {
    console.error("Error saving session stats:", error);
    res.status(500).json({ error: 'Error saving session stats' });
  }
};

const getCourseLifetimeStats = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.header('userId');
    const courseStats = await getCourseStats(courseId, userId);
    res.status(201).json(courseStats);
  } catch (error) {
    console.error("Error retrieving course stats:", error);
    res.status(500).json({ error: 'Error retrieving course stats' });
  }
};

const getSingleSessionStat = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const sessionStat = await getSessionStat(sessionId);
    res.status(200).json(sessionStat);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving session stats' });
  }
};

module.exports = { postCourseStat, getCourseLifetimeStats, getSingleSessionStat };