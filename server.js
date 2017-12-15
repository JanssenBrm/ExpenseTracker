'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var Expense =  require('./src/model/Expense');

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://localhost:27017/expensetracking', {
    useMongoClient: true
});

console.log(mongoose);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
res.json({ message: 'API Initialized!'});
});

router.route('/expenses')
  .get(function(req, res){
      Expense.find(function(err, expenses){
          if(err)
              res.send(err);
          res.send(expenses);
      })
  });


app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});