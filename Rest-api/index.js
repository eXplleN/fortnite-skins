require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRouter = require('./router'); 
const { errorHandler } = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes'); 
const dbConnector = require('./config/db'); 
const app = express();


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    
    await dbConnector();

    
    app.use(cors());
    app.use(express.json());

   
    app.use('/api/users', userRoutes); 
    app.use('/api', apiRouter); 

    
    app.use(errorHandler);

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
  }
})();
