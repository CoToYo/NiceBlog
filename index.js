/**
 * Import external modules or libaraies into Node.js application.
 */
const express = require('express')

const { config, engine } = require('express-edge');

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const expressSession = require("express-session")

const connectMongo = require('connect-mongo')

const connectFlash = require('connect-flash')

const storePost = require('./middleware/storePost')

const auth = require('./middleware/auth')


const createPostController = require('./controllers/createPost')

const homePageController = require('./controllers/homePage')

const storePostController = require('./controllers/storePost')

const getPostController = require('./controllers/getPost')

const aboutPageController = require('./controllers/aboutPage')

const createUserController = require('./controllers/createUser')

const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')



// connect to mongodb database 'nice-blog', if this database is not exists, it will automatically creates for us.
mongoose.connect('mongodb://localhost/nice-blog')

/**
 * Apply Express middlewares
 */
const app = new express()

// all additional resources (e.g. images, css, js) should be searched in '/public' directory
app.use(express.static('public'))

// Automatically set view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

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

// a middleware that provides a way to store and retrieve flash message(short-lived message), e.g. used for showing successful login message.
app.use(connectFlash())


app.get('/', homePageController)

app.get('/about', aboutPageController)

app.get('/post/:id', getPostController)

// 'auth' is the middleware that would be executed before controller being called.
app.get('/posts/new', auth, createPostController)

app.get('/auth/register', createUserController)

app.get('/auth/login', loginController)

// 'storePost' & 'auth' are the middlewares that would be executed before controller being called.
app.post('/posts/store',auth ,storePost, storePostController)

app.post('/users/register', storeUserController)

app.post('/users/login', loginUserController)

app.listen(4000, () =>{ console.log('App is listening port 4000 now.') })