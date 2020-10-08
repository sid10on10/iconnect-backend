var mongodb = require('mongodb')
var mongodClient = mongodb.MongoClient;
// connecting to mongo db cluster atlas url from env
var url = process.env.MongoUrl;


module.exports = {url,mongodClient}