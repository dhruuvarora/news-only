// // routes/adminRoutes.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const News = require('../models/News'); // Import the News model
// const router = express.Router();

// // Set up storage engine for multer (to save uploaded files)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/uploads'); // Save uploaded files in the 'uploads' folder inside 'public'
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name to avoid conflict
//     }
// });

// const upload = multer({ storage: storage });

// // Route for displaying the add news form (Admin)
// router.get('/add', (req, res) => {
//     res.render('admin/addNews'); // Render the addNews.ejs template
// });

// // Route for handling form submission (Admin)
// router.post('/add', upload.single('image'), async (req, res) => {
//     const { title, description } = req.body;
//     const image = req.file ? req.file.path : null; // Get image path if uploaded

//     // Create a new news entry and save it to the database
//     const newNews = new News({ title, description, image });
//     await newNews.save();

//     // Redirect back to the add page after successful submission
//     res.redirect('/admin/add');
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const News = require('../models/News');
const router = express.Router();

// Set up storage engine for multer (to save uploaded files)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads'); // Save uploaded files in the 'uploads' folder inside 'public'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name to avoid conflict
    }
});

const upload = multer({ storage: storage });

// Route for displaying the add news form (Admin)
router.get('/add', (req, res) => {
    res.render('admin/addNews', { message: null }); // Render the addNews.ejs template
});

// Route for handling form submission (Admin)
router.post('/add', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? 'uploads/' + req.file.filename : null; // Store relative image path

    if (!title || !description) {
        return res.status(400).send('Title and description are required!');
    }

    try {
        // Create a new news entry and save it to the database
        const newNews = new News({ title, description, image });
        await newNews.save();

        // Emit the new news to all connected clients (for real-time updates)
        req.app.get('io').emit('newNews', newNews);

        // Render the same page with a success message
        res.render('admin/addNews', { message: 'News posted successfully!' });
    } catch (error) {
        console.error('Error saving news:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
