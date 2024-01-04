const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    date: {
        type: Date,
        
    },

});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;