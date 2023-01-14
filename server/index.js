const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {MongoClient} = require('mongodb')
const app = express();

require('dotenv').config()


// DB Connection 
    const username = process.env.DB_USERNAME
    const password = process.env.DB_PASSWORD
    const clusterUrl = process.env.CLUSTER_URL

    const uri = `mongodb+srv://${username}:${password}@${clusterUrl}`

    const client = new MongoClient(uri);

    async function run() {
        try {
            await client.connect().then(console.log('DB Connected')).catch((e) => console.log(e))
        } finally {
            await client.close()
        }
    }

    run().catch(console.dir)

// Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false}))

// Parse application/json
    app.use(bodyParser.json())

// Routes
    const posts = require('./Routes/Posts')
    const auth = require('./Routes/Auth');
    const users = require('./Routes/User');


    app.use('/posts', posts);
    app.use('/user', users);
    app.use('/auth', auth);


// Server PORT 

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

