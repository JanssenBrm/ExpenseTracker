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

router.get('/expenses', function(req, res){
    Expense.find(function(err, expenses) {
        if (err)
            res.send(err);
        res.send(expenses.map(expense => {
            expense.amount = expense.amount.replace(',', '.');
            return expense;
        }));
    });
});

router.put('/expenses/:expenseId', function(req, res){
    console.log("Updating expense with ID:", req.params.expenseId);
    Expense.findById(req.params.expenseId, function(err, expense){
        if(err)
            res.send(err);
        else{
           expense.categories = req.body.categories;
           expense.save(function(err){
               if(err)
                   res.send(err);
               else
                   res.send('OK');
           });
        }
    });
});


app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});