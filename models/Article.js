const mongoose = require('mongoose');

const articlSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    numberOfViews: {
        type: Number,
        default: 0
    },
})

const Article = mongoose.model("Article", articlSchema);

module.exports = Article;