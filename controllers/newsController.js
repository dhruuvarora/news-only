const News = require('../models/News');

// Fetch all news
const getAllNews = async (req, res) => {
    const news = await News.find().sort({ createdAt: -1 });
    res.render('user/newsFeed', { news });
};

// Add news
const addNews = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const newNews = new News({ title, description, image });
        await newNews.save();

        // Emit the event to clients
        req.io.emit('newNews', newNews);

        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { getAllNews, addNews };
