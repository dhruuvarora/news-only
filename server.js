// // server.js
// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const newsRoutes = require('./routes/newsRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Connect to the database
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder
// // Serve static files for images (make sure images are publicly accessible)
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// // Set EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views')); // Set views path to root's views folder

// console.log("Views Directory:", path.join(__dirname, 'views'));  // Log to verify views directory

// // Routes
// app.use('/news', newsRoutes);
// app.use('/admin', adminRoutes); // Admin routes

// // Start the server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');  // Import http to create server
const connectDB = require('./config/db');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const socketIo = require('socket.io');  // Import Socket.IO

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = socketIo(server);  // Initialize Socket.IO on the server

app.set('io', io); // Make io available globally in the app

const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve image files

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/news', newsRoutes);
app.use('/admin', adminRoutes);

// Start the server with Socket.IO
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
