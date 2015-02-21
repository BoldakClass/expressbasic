/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

require('./routes')(app);
console.log('Express started on port 3000');

module.exports = app;