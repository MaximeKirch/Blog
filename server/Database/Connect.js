const {MongoClient} = require('mongodb');
require('dotenv').config()

// DB Connection 
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const clusterUrl = process.env.CLUSTER_URL
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}`

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    
});


module.exports = client;