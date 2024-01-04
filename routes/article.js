const express = require('express');
const authenticateToken = require('../middlewares/auth.js'); 
const Article = require('../models/articleModel');

const router = express.Router();

// Create a new article
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newArticle = new Article({
      title,
      author: req.user.name,
      description,
      date: Date.now(),
    });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all articles
router.get('/getAll', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific article by ID
router.get('/getById/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific article by title
router.post('/getByTitle', async (req, res) => {
  try {
    const article = await Article.find({title:req.body.title});
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an article by ID
router.post('/updateById/:id', authenticateToken, async (req, res) => {
    try {
    //   console.log("1")
        const article = await Article.findById(req.params.id);
        // console.log("3")
      if (article.author !== req.user.name) {
          return res.status(404).json({ error: 'You can not update this article' });
        }
        // console.log("1")
        const { title, description } = req.body;
        // console.log("1")
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { title, author:req.user.name, description, date: Date.now() },
            { new: true }
            );
            // console.log("1")
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an article by ID
router.post('/deleteById/:id', authenticateToken, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article.author !== req.user.name) {
            return res.status(404).json({ error: 'You can not delete this article' });
        }
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
