# Stats Service

## Overview
The Stats Service is a backend service designed to track user stats for courses in an online learning platform. It provides endpoints to save user stats for individual learning sessions, retrieve aggregated stats for a course, and retrieve stats for a single session.

## Features
- **Save Session Stats**: Persist stats after each learning session.
- **Fetch Course Stats**: Aggregate stats across multiple sessions for a user in a particular course.
- **Fetch Single Session Stats**: Retrieve stats for a single learning session.

## Tech Stack
- **Node.js** with **Express.js** for backend development
- **Sequelize** ORM for database interactions
- **PostgreSQL** as the relational database
- **Jest** for testing

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (version 14.x or later)
- **PostgreSQL** (version 12 or later)
- **npm** (comes with Node.js)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RachanSaini/stats-service.git
   cd stats-service
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL Database**
   - Start PostgreSQL:
     ```bash
     brew install postgresql
     ```
     ```bash
     brew services start postgresql
     ```
   - Create the database and user:
     ```bash
     psql postgres
     CREATE DATABASE stats_service_db;
     CREATE USER your_user WITH PASSWORD 'your_password';
     GRANT ALL PRIVILEGES ON DATABASE stats_service_db TO your_user;
     ```

4. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following configurations:
   ```plaintext
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=stats_service_db
   DB_PORT=5432
   ```

## Running the Application

1. **Start the Server**
   ```bash
   node src/server.js
   ```

    Server is running on http://localhost:3000
    Database connected...
    Database synchronized   

## Testing the API

### Endpoints
1. **POST /api/courses/:courseId**
   Save a new session stat for a user.

   ```bash
   curl -X POST http://localhost:3000/api/courses/123e4567-e89b-12d3-a456-426614174000 \
   -H "Content-Type: application/json" \
   -H "userId: f47ac10b-58cc-4372-a567-0e02b2c3d479" \
   -d '{
     "sessionId": "550e8400-e29b-41d4-a716-446655440000",
     "totalModulesStudied": 5,
     "averageScore": 85,
     "timeStudied": 120
   }'
   ```

2. **GET /api/courses/:courseId**
   Retrieve aggregated stats for a course.

   ```bash
   curl -X GET http://localhost:3000/api/courses/123e4567-e89b-12d3-a456-426614174000 \
   -H "userId: f47ac10b-58cc-4372-a567-0e02b2c3d479"
   ```

3. **GET /api/courses/:courseId/sessions/:sessionId**
   Retrieve stats for a single session.

   ```bash
   curl -X GET http://localhost:3000/api/courses/123e4567-e89b-12d3-a456-426614174000/sessions/550e8400-e29b-41d4-a716-446655440000
   ```

## Running Tests

1. **Run Unit Tests**
   ```bash
   npm test
   ```

   This will run tests defined in the `src/tests` directory using **Jest**.

## Assumptions and Notes
1. **UUIDs** are used for courseId, userId, and sessionId.
2. **Database**: PostgreSQL is assumed but can be configured as per environment needs.
3. **Error Handling**: Basic error handling is implemented for all routes.