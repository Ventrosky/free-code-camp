const collection = require('../services/databaseurls.js');
const db_cfg = require('../config/database.js');
var short = require('short-uuid');

function getNewUrls(){
    return short.generate();
}

function makeResp(obj){
    return {"original_url":obj.fullurl,"short_url":obj.short}
}
  

async function simpleInsertURL(fullurl){
    let newUrl = {fullurl, short: getNewUrls()};
    console.log(newUrl)

    const data = await collection.getCollection()
        .insertOne(newUrl)
        .then(result => {
            console.log("insertOne");
        })
        .catch(err => {
            console.error(err)
        })
    return makeResp(newUrl);
}

async function  findShortURL(shortUrl){
    let found = await collection.getCollection()
        .findOne({short: shortUrl})
        .then(item => {
            return item
        })
        .catch(err => {
            console.error(err)
        })
    return makeResp(found);
}


module.exports.insertURL = simpleInsertURL;
module.exports.findURL = findShortURL;