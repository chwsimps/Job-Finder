var User = require('../models/user.js');
var LocalStrategy = require('passport-local');

var strategyOptions = {
  usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {

  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) return done (err);

    if(!user) return done(null, false, {
      message: ' Wrong Email or Password'
    });

    user.comparePasswords(password, function(err, isMatch) {
      if(err) return done (err);

      if(!isMatch) return done(null, false, {
        message: ' Wrong Email or Password'
      });

      return done(null, user);

    });
  })
});

exports.register = new LocalStrategy(strategyOptions, function(email, password, done) {

  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) return done (err);

    if(user) return done(null, false, {
      message: ' Email already exists'
    });

    var newUser = new User({
      email: email,
      password: password
    })

    newUser.save(function(err) {
      done(null, newUser);
    })
  });
});
