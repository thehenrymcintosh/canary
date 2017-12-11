var express = require("express");
var router = express.Router();
var Article = require("../models/articles");


router.get('/', function(req, res){
    res.render('api');
});

router.get('/articles', function(req, res){
    var query = req.query;
    
   Article.getArticles(query, function(err, articles){
        if(err){ 
            throw err
        };
        res.json(articles);
   });
});

router.get('/articles/:_id', function(req, res){
    Article.getArticleByID(req.params._id, function(err, article){
         if(err){ 
             throw err
         };
         res.json(article);
    });
 });


router.post('/articles/add', function(req,res){
    var title = req.body.title;
    var content = req.body.content;

    req.checkBody('title', "Title is required").notEmpty();
    req.checkBody('content', "Content is required").notEmpty();
    var authorID = req.user.id;
    var authorName = req.user.name;

    var errors = req.validationErrors();



    if (errors){
        res.render('index', {
            errors: errors
        });
    } else {
       
        console.log("Success");
        var newArticle = new Article({
            title: title,
            content:{
                text: content
            },
            author: {
                id: authorID,
                name: authorName
            }

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

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    } else{
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
}

module.exports = router;
