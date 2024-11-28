const express = require('express');
const cors = require('cors');
const apiRouter = require('./router');
const { errorHandler } = require('./utils/errorHandler');
const dbConnector = require('./config/db');
require('dotenv').config();

const app = express();


dbConnector().then(() => {
  app.use(cors());
  app.use(express.json());

 
  app.use('/api', apiRouter);

  
  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

