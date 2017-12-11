var express = require("express");
var router = express.Router();
var Article = require("../models/articles");

// get dashboard
router.get('/', ensureAuthenticated, function(req, res){
    var query = {
        "author.id": req.user.id
    }
    console.log(req.user.id);
    Article.getArticles(query, function(err, articles){
        if(err){ 
            throw err
        };
        console.log(articles);
        res.render('dashboard', {articles: articles});
   });

     
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