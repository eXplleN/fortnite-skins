# Fortnite Skins Catalog

## Project Overview

The **Fortnite Skins Catalog** is a web application that allows users to browse, like, dislike, add to wishlist, and manage their Fortnite skins. Users can register, log in, and manage their profiles. The application communicates with a backend server and uses MongoDB for data storage.

This project is built with **Angular** for the frontend and **Node.js** with **Express** for the backend, utilizing **MongoDB** for persistent storage.

---

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Skin Catalog**: View, like, dislike, and add skins to a wishlist.
- **Profile Management**: Users can view and manage the skins they have added.
- **Admin Functionality**: Users can add, edit, and delete skins they have created.
- **Data Persistence**: Skin data is stored in a MongoDB database.

---

## Used Frameworks and Libraries

- **Frontend**:
  - **Angular** (18+): Used for building the web application, components, and routing.
  - **RxJS**: For handling asynchronous operations and state management.
  - **Bootstrap**: For UI styling and responsive design.

- **Backend**:
  - **Node.js**: JavaScript runtime environment for the backend server.
  - **Express**: Web framework for handling HTTP requests and routing.
  - **MongoDB**: NoSQL database for storing skin data and user information.
  - **JWT (JSON Web Tokens)**: For user authentication and authorization.

- **Other Libraries**:
  - **MongoDB Compass**: For managing and visualizing the MongoDB database.
  - **Postman**: For testing API endpoints.

---

## Architecture

The project follows a **client-server architecture** with the following structure:

1. **Frontend (Angular)**:
   - The frontend is responsible for rendering the user interface and interacting with the backend through HTTP requests.
   - Components like `CatalogComponent`, `AddSkinComponent`, and `MyProfileComponent` manage different parts of the application.
   - Route guards are used to protect certain routes, ensuring only authenticated users can access specific functionalities.

2. **Backend (Node.js/Express)**:
   - The backend serves as the API for the frontend, handling requests such as user registration, login, skin CRUD operations, and user authentication.
   - Data is stored in MongoDB, and the backend uses **JWT** tokens to manage user sessions and authorization.
   - The server uses **Express** to handle routing and middleware for tasks like authentication, logging, and error handling.

3. **Database (MongoDB)**:
   - MongoDB stores all user data and skin data. The skins collection contains skin information (e.g., name, rarity, description) and is manipulated through various API endpoints.
   - Users can store their skins in the database, and the data is retrieved to populate the catalog and profile.

---

## How to Run the Project
1. Unzip the winrar file.
2. Open fortnite-skins-main folde with Visual Studio Code.
3. Open the Rest-api folder in Integrated Terminal.
4. Run the "npm install" command in the terminal.
5. Create ".env" file in Rest-api folder.
6. In ".env" file paste this: 

MONGO_URI=mongodb://localhost:27017/fortnite-skins

PORT=3000

JWT_SECRET=my$3cureJWT#Key12345

7. Open the src folder in Integrated Terminal.
8. Run the "npm install" command in the terminal.
9. Run the "npm start" command in the Rest-api terminal.
10. Run the "ng serve" command in the src terminal.
11. Open a tab in your browser on: http://localhost:4200/
