// routes/newsRoutes.js
const express = require('express');
const News = require('../models/News'); // Import the News model
const router = express.Router();

// Route for displaying news feed (User)
router.get('/feed', async (req, res) => {
    try {
        // Fetch all news from the database, sorted by creation date
        const news = await News.find().sort({ createdAt: -1 });

        // Pass the news data to the newsFeed template
        res.render('user/newsFeed', { news });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
