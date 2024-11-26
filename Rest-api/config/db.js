const mongoose = require('mongoose');

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

module.exports = dbConnector;
