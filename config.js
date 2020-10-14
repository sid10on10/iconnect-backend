var mongodb = require('mongodb')
var mongodClient = mongodb.MongoClient;
// connecting to mongo db cluster atlas url from env
var url = "mongodb+srv://sid10on10:qwerty123@cluster0.fqer8.mongodb.net/iconnect?retryWrites=true&w=majority";


module.exports = {url,mongodClient}