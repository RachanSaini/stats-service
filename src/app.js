const express = require('express');
const bodyParser = require('body-parser');
const statsRoutes = require('./routes/statsRoutes');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use('/api', statsRoutes);

sequelize.sync().then(() => console.log('Database synchronized'));

module.exports = app;