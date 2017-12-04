var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        id: String,
        name: String
    },
    reacts:{
        MB: Number,
        INSP: Number,
        DBT: Number
    },
    content:{
        text: String,
        timeStamp: { type: Date, default: Date.now },
        keywords: String,
        tags: String,
		primaryCategory: String,
		secondaryCategories: String
    }
});

var article = module.exports = mongoose.model('article', articleSchema);