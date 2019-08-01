const mongo = require('mongodb').MongoClient

const db_cfg = require('../config/database.js');

var db;
var collection;

async function initialize(url) {
    mongo.connect(url, { useNewUrlParser: true },(err, client) => {
        if (err) {
          console.error(err)
          return
        } 
        db = client.db('urls') //select a database
        collection = db.collection('urlsdata') //create and get a collection
    });
    
}

async function close() {
    await client.close();
}

function getCollection(){
    return collection;
}

module.exports.initialize = initialize;
module.exports.close = close; 
module.exports.getCollection = getCollection;
