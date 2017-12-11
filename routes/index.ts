var express = require("express");
var router = express.Router();
var Article = require("../models/articles");

// get homepage
router.get('/', function(req, res){

    Article.getAllArticles( function(err, articles){
        if(err){ 
            throw err
        };
        console.log(articles);
        res.render('index', {articles: articles});
   });

     
});



module.exports = router;