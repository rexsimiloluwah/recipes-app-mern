// Express app
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const connectToMongo = require('./db/connectToMongo')
const recipesRoutes = require('./routes/recipes');
const usersRoutes = require('./routes/users');
const authRouter = require('./routes/auth');

const HttpError = require('./errors/HttpError');

// Initialize the Express app
const app = express()

// Configuration for environment variables
dotenv.config()

//Middlewares for the app
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())


// Connect to the Mongo.db database 
connectToMongo()

// MORGAN (NOTE :- Use this only in development mode.)
app.use(morgan('dev'))

// Handling CORS
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }

    next()
})

// Routes
app.use("/api/recipes", recipesRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/auth", authRouter)


// Error handling for unsupported routes 
app.use( (req, res, next) => {
    const error = new HttpError("Could not find specified route.", 500)
    throw error;
})

// Error Handling Middleware

app.use( (error, req, res, next) => {

    if (res.headerSent){
        next(error)
    }

    res.status(error.code || 500)
    .json({
        "message" : error.message || "An unknown error occurred."
    })
})

// Deployment 

if (process.env.NODE_ENV === 'production'){
    
    // Serve static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

module.exports = app;