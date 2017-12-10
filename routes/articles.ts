var express = require("express");
var router = express.Router();
var Article = require("../models/articles");


router.get('/', function(req, res){
    res.render('api');
});

router.get('/articles', function(req, res){
   Article.getArticles(function(err, articles){
        if(err){ 
            throw err
        };
        res.json(articles);
   });
});

router.post('/articles/add', function(req,res){
    var title = req.body.title;
    var content = req.body.content;

    req.checkBody('title', "Title is required").notEmpty();
    req.checkBody('content', "Content is required").notEmpty();


    var errors = req.validationErrors();



    if (errors){
        res.render('index', {
            errors: errors
        });
    } else {
       
        console.log("Success");
        var newArticle = new Article({
            title: title,
            content: content
        });
        Article.addArticle(newArticle, function(err, newArticle){
            if(err){
                throw err;
            }
            console.log(newArticle)
        });
        req.flash("success_msg", "Article saved");
        res.redirect('/');
               
    }
});

module.exports = router;