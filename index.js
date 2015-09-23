var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var users = [];

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) {
    throw err;
  }

  JSON.parse(data).forEach(function (user) {

    user.fullname = _.startCase(user.first + ' ' + user.last);
    users.push(user);
  });
});

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {

  var buffer = '';

  users.forEach(function (user) {
    buffer += '<a href=/' + user.first + '>'+ user.fullname + '<br>'
  });

  res.send(buffer);
});

app.get('/:first', function (req, res) {

  var first = req.params.first;

  res.send(first);
});

app.get('/yo', function (req, res) {
  res.send('yo');
});

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + '3000');
});
