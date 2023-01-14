const express = require('express');
const bodyParser = require('body-parser')
const client = require('./Database/Connect');

const app = express();

require('dotenv').config()

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

