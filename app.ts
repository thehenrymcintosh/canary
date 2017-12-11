var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");
// uncomment next line for running locally
var dbURI = 'mongodb://localhost/canary';

// uncomment next line for deploying
// var dbURI = "mongodb://systemtest:testing@ds129926.mlab.com:29926/canarybuild"
mongoose.connect(dbURI);

// mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

var routes = require("./routes/index");
var users = require("./routes/users");
var api = require("./routes/api");
var dashboard = require("./routes/dashboard");

// init app
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: "extremelysecretfingerprints0011",
    saveUninitialized: true,
    resave: true
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while (namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect flash
app.use(flash());

//global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use('/dashboard', dashboard);


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

//tests