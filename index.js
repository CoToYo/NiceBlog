/**
 * Import external modules or libaraies into Node.js application.
 */
const express = require('express')

// const { config, engine } = require('express-edge')
const ejs = require('ejs')

const edge = require('edge.js')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const expressSession = require("express-session")

const connectMongo = require('connect-mongo')

const connectFlash = require('connect-flash')

const cloudinary = require('cloudinary')

const storePost = require('./middleware/storePost')

const auth = require('./middleware/auth')

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


const createPostController = require('./controllers/createPost')

const homePageController = require('./controllers/homePage')

const storePostController = require('./controllers/storePost')

const getPostController = require('./controllers/getPost')

const aboutPageController = require('./controllers/aboutPage')

const createUserController = require('./controllers/createUser')

const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')



// connect to mongodb database 'nice-blog', if this database is not exists, it will automatically creates for us.
mongoose.connect('mongodb://localhost/nice-blog')

/**
 * Apply Express middlewares
 */
const app = new express()

// all additional resources (e.g. images, css, js) should be searched in '/public' directory
app.use(express.static('public'))

// Configure Edge
// config({ cache: process.env.NODE_ENV === 'production' });

// Automatically set view engine and adds dot notation to app.render
// app.set('view', `${__dirname}/views`);
app.set('view engine', 'ejs')

// Help us accept and parse JSON data from the client side(browser)
app.use(bodyParser.json())

// Basic setup that we need to be able to pass data from client side and understand it in NodeJS application.
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). 
// This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
// This parser accepts only UTF-8 encoding of the body
app.use(bodyParser.urlencoded({ extended: true }))

// express package that allow processing file uploading
app.use(fileUpload())

// This middleware will create a session ID for user at server-side and also send an associated session ID (called cookie) to client-side
app.use(expressSession({
    // necessary: encrypted the cookies
    secret: 'secret', 
    
    // use a specific store we have provided
    // with this configuration, it won't create or connect to mongo database we have created and connected again
    store: connectMongo.create({
        // pass the connection instance
        mongoUrl: 'mongodb://localhost/nice-blog',
        collection: 'sessions' // default name
    })
}))

// '*' means on all requests, this middleware should be executed.
app.use('*', (req, res, next) => {

    // edge.global('auth', req.session.userId) is not supported any more
    // in general, the app.locals object in Express is used to store application-level variables 
    // and values that are available to all templates and routes within an Express application.
    // variable name: auth ; value : req.session.userId
    app.locals.auth = req.session.userId

    next()
})

// a middleware that provides a way to store and retrieve flash message(short-lived message), e.g. used for showing successful login message.
app.use(connectFlash())

// cloudinary
cloudinary.config({
    api_key: '345398277491559',

    api_secret: 'AxFDDc8Fi8AgMCy8AMWiHUHLylE',

    cloud_name: 'dpuigzwhs'
})


app.get('/', homePageController)

app.get('/about', aboutPageController)

app.get('/post/:id', getPostController)

// 'auth' is the middleware that would be executed before controller being called.
app.get('/posts/new', auth, createPostController)

app.get('/auth/login', redirectIfAuthenticated, loginController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.get('/auth/logout', logoutController)


// 'storePost' & 'auth' are the middlewares that would be executed before controller being called.
app.post('/posts/store',auth ,storePost, storePostController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)


// if all routes above are not match with request from client
app.use((req, res) => res.render('notfound'))


const port = process.env.PORT || 4000

app.listen(port, () =>{ console.log(`App is listening port ${port} now.`) })