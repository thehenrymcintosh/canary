var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost/canary");
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    name:{
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback: Function){
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username: string, callback: Function){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword: string, hash:string , callback: Function){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUserByID = function(id: string, callback: Function){
    User.findById(id, callback);
}