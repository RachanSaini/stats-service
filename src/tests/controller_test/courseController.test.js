const request = require('supertest');
const express = require('express');
const { postCourseStat, getCourseLifetimeStats, getSingleSessionStat } = require('../../controller/courseController');
const { createSessionStat, getCourseStats, getSessionStat } = require('../../services/statService');

jest.mock('../../services/statService');

// Initializing Express app
const app = express();
app.use(express.json());

// Test routes
app.post('/api/courses/:courseId', postCourseStat);
app.get('/api/courses/:courseId', getCourseLifetimeStats);
app.get('/api/sessions/:sessionId', getSingleSessionStat);

describe('Course Controller', () => {
  const mockData = {
    sessionId: '550e8400-e29b-41d4-a716-446655440000',
    userId: 'rachan',
    courseId: 'course123',
    totalModulesStudied: 5,
    averageScore: 85,
    timeStudied: 120,
  };

  describe('POST /api/courses/:courseId', () => {
    it('should create a session stat successfully', async () => {
      createSessionStat.mockResolvedValue(mockData);

      const res = await request(app)
        .post('/api/courses/course123')
        .send({
          sessionId: mockData.sessionId,
          totalModulesStudied: mockData.totalModulesStudied,
          averageScore: mockData.averageScore,
          timeStudied: mockData.timeStudied,
        })
        .set('userId', mockData.userId);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockData);
      expect(createSessionStat).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors when creating a session stat', async () => {
      createSessionStat.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .post('/api/courses/course123')
        .send({
          sessionId: mockData.sessionId,
          totalModulesStudied: mockData.totalModulesStudied,
          averageScore: mockData.averageScore,
          timeStudied: mockData.timeStudied,
        })
        .set('userId', mockData.userId);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Error saving session stats');
    });
  });

  describe('GET /api/courses/:courseId', () => {
    it('should fetch aggregated course stats', async () => {
      getCourseStats.mockResolvedValue([mockData]);

      const res = await request(app)
        .get('/api/courses/course123')
        .set('userId', mockData.userId);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual([mockData]);
      expect(getCourseStats).toHaveBeenCalledWith(mockData.courseId, mockData.userId);
    });

    it('should handle errors when fetching course stats', async () => {
      getCourseStats.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .get('/api/courses/course123')
        .set('userId', mockData.userId);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Error retrieving course stats');
    });
  });

  describe('GET /api/sessions/:sessionId', () => {
    it('should fetch a single session stat', async () => {
      getSessionStat.mockResolvedValue(mockData);

      const res = await request(app).get(`/api/sessions/${mockData.sessionId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(getSessionStat).toHaveBeenCalledWith(mockData.sessionId);
    });

    it('should handle errors when fetching a single session stat', async () => {
      getSessionStat.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get(`/api/sessions/${mockData.sessionId}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Error retrieving session stats');
    });
  }); 
});
