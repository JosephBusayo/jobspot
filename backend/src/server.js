require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4001
const cors = require("cors");

const DB = require('./database/index')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const passport = require('passport')

const jobRoute = require('./routes/job')
const authRoute = require('./routes/auth')

require('./strategies/local')
require('./strategies/github')

// middleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true })) 
app.use(
    session({
        secret : "ADDFERMTYY2",
        
        resave: false,
        saveUninitialized : false,
        store : MongoStore.create({
            mongoUrl : process.env.MONGO_URI
        })
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});


//routes
app.use('/jobs', jobRoute)
app.use('/auth', authRoute)



DB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})

