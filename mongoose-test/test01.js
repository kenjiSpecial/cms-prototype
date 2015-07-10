var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mongo_test");

var User = require('../models/users');

var chris = new User({
    name : 'Chris',
    username : 'ssssss',
    password : "specsssial",
    admin : true
});

/*
chris.save(function(err) {
    if(err) throw err;

    console.log('User created!');
});
*/

User.find({}, function(err, users){
    if(err) throw err;

    console.log(users);
});
