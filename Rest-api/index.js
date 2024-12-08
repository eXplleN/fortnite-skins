require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const skinRoutes = require("./routes/skinRoutes");
const wishlistRoutes = require('./routes/wishlist.routes');
const protectedRoutes = require("./routes/protectedRoutes");
const dbConnector = require("./config/db");
const { errorHandler } = require("./utils/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;


(async () => {
  try {
    await dbConnector();

    
    app.use(cors());
    app.use(express.json());

    
    app.use("/api/users", userRoutes);
    app.use("/api/skins", skinRoutes);
    app.use("/api", protectedRoutes);

    
    app.use(errorHandler);

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1); 
  }
})();
