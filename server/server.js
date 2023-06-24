var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
var path = require("path");
var config = require("config");
const bcrypt = require("bcrypt");

//var port = 8080;

const buildPath = path.join(__dirname, "../client/build");
const indexPath = path.join(__dirname, "../client/build/index.html");
app.use(cors());

app.use(express.static(buildPath));
app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

// create user account
app.get("/create/:name/:email/:password/:balance", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already exists");
      res.send({success:false, message:"User already exists"});
    } else {
      // else create user
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.params.password, salt, function (err, hash) {
          if (err) throw err;
          dal
            .create(req.params.name, req.params.email, hash, req.params.balance)
            .then((user) => {
              console.log(user);
              res.send({success:true, user:user});
            });
        });
      });
    }
  });
});

// login user
app.get("/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      bcrypt.compare(
        req.params.password,
        user[0].password,
        function (err, isMatch) {
          if (isMatch) {
            console.log(JSON.stringify({ success: true, user: user[0] }));
            res.send({ success: true, user: user[0] });
          } else {
            res.send({
              success: false,
              message: "Login failed: wrong password",
            });
          }
        }
      );
    } else {
      res.send({ success: false, message: "Login failed: user not found" });
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send({balance:amount});
  });
});

// all accounts
app.get("/users", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

app.listen(config.port);
console.log("Running on port: " + config.port);
