const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const host = config.get('server.host');
const user = config.get('server.user');
const cluster = config.get('server.cluster'); 

const url=host + user + cluster;
//const url         = 'mongodb+srv://raboudina:bgrazBa9FUYvvIP7@cluster0.k1kbdyc.mongodb.net/';
//const url         = 'mongodb://mongo:27017';

let db            = null;
 
//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");
    // connect to myproject database
    db = client.db('goodbank');
});

// create user account
function create(name, email, password, balance) {
  return new Promise((resolve, reject) => {
      const collection = db.collection('users');
      const doc = {name, email, password, balance};
      collection.insertOne(doc, {w:1}, function(err, result) {
          err ? reject(err) : resolve(doc);
      });
  })

}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .updateOne(
                {email: email},
                { $set: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};