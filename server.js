const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001;


// Middleware

const corsOptions = {
    origin : [`http://localhost:3000`, `https://share-ur-sarees.herokuapp.com`],
    credentials : true,
    optionSuccessStatus : 200
}

app.use(cors(corsOptions))

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({extended : true}))

app.use(bodyParser.json())

app.use(session({
    // Store the session in our DB
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: "verysecret",
    resave: false,
    saveUninitialized: false, // Only create a session if a property has been added to the session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // cookie will expire in 1 week
    }
}))

app.get('/', (req,res) => {
    res.send('<h1>Testing</h1>')
})

app.use('/api/v1/auth', routes.auth)

app.use('/api/v1', routes.api)

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`)
})