var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/canary");
var db = mongoose.connection;

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

module.exports.getArticles = function(callback: Function, limit: number){
    article.find(callback).limit(limit);
}

module.exports.addArticle = function(newArticle, callback: Function){
    newArticle.save(callback);
};

module.exports.getArticleByID = function(id: string, callback: Function){
    article.findById(id, callback);
}