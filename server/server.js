var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');


var port = 8080;

app.use(cors());

// create user account
app.get('/create/:name/:email/:password/:balance', function (req, res) {
    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.send('User exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password,req.params.balance).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send({success:true, user: user[0]});
                }
                else{
                    res.send({success:false, message:'Login failed: wrong password'});
                }
            }
            else{
                res.send({success:false, message:'Login failed: user not found'});
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/users', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});


app.listen(port);
console.log('Running on port: ' + port);