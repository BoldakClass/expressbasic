/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports = express();

// config

app.set('view engine', 'ejs');
app.set('view s', '../views');

// routing logic

module.exports = function(app) {

  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', function(req, res){
    //console.log(req.headers);
    res.redirect('/login');
  });

  app.get('/login', function(req, res) {
    res.render('login', {
      message: '',
      userInfo: ''
    });
  })

  app.post('/login', function(req, res){
    console.log(req.body.username);
    var User = require("../models/user").User;
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    console.log('salt: ' + user.salt);
    User.findOne({ username: user.username }, function(err, data){
      if(err) {
        res.render('error', {
          message: 'Oops.',
          stack: (err.toString())
        });
      }
      if(data) {
        if(user.checkPassword(data.hashedPassword)) {
          console.log("user found: " + user.username);
          res.render('login', {
            message: ('<p class="msg success"> user found: ' + user.username + '</p>'),
            userInfo: '<pre><code>' + JSON.stringify(user, null, 3) + '</code></pre>'
          })
        }
        else {
          console.log("incorrect password for user " + user.username);
          res.render('login', {
            message: ('<p class="msg error"> incorrect password for user: ' + user.username + '</p>'),
            userInfo: ''
          })
        }
      }
      else {
        console.log("add to database: " + user.username);
        user.save(function (err, user, affected) {
          if(err) throw err;
          console.log("saving...");
          console.log("new user saved: " + user.username);
          res.render('login', {
            message: ('<p class="msg success"> user registered: ' + user.username + '</p>'),
            userInfo: ''
          })
        });
      }
      next();
    });
  });
}