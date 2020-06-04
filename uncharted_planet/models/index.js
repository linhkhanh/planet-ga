//////////// CONNECT TO MONGODB ////////
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'demoProject';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log('Connected successfully to server');

//   const planet = client.db(dbName).collection('planet');

// });
module.exports = {
    async connect () {
        await client.connect();
        console.log('Successfully connected to Mongo');
        this.planet = client.db(dbName).collection('planet');
    },
    disconnect () {
        return client.close();
    }
};