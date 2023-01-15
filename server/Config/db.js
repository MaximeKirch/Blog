const mongoose = require('mongoose');
require('./.env')
// DB Connection 
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const clusterUrl = process.env.CLUSTER_URL
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}`

mongoose
    .connect(uri)
    .then(() => console.log('Connected to MongoDB.'))
    .catch((err) => console.log('Failed to connect to MongoDB.', err))