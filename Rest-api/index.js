const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./router'); 
const { errorHandler } = require('./utils'); 
const dbConnector = require('./config/db');
require('dotenv').config();


dbConnector().then(() => {
 
  app.use(cors());
  app.use(express.json()); 
  app.use('/api', apiRouter); 

  
  app.use(errorHandler);

  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
