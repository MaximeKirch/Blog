const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postRoutes = require('./Routes/Posts.routes.js');
const usersRoutes = require('./Routes/User.routes.js')
const cors = require('cors');
const {checkUser, requireAuth} = require('./Middlewares/Auth.middleware.js')

require('dotenv').config()
require('./Config/db')

const app = express();

const corsOptions = {
    origin:process.env.CLIENT_URL,
    credentials : true,
    'allowHeaders' : ['sessionId', 'Content-Type'],
    'exposeHeaders' : ['sessionId'] ,
    'methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue' : false
}
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json())
    app.use(cookieParser);

// Routes
    app.use('/api/posts', postRoutes);
    app.use('/api/users', usersRoutes);
    app.use('/api/auth', auth);


// Server PORT 

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })

