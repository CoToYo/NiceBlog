/**
 * Import external modules or libaraies into Node.js application.
 */
const express = require('express')

const app = new express()

const { config, engine } = require('express-edge');

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const expressSession = require("express-session")

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

// require a existed custom middleware for "posts creation validation"
const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

// This middleware will create a session ID for user at server-side and also send an associated session ID (called cookie) to client-side
app.use(expressSession({
    secret: 'secret' // necessary: encrypted the cookies
}))


app.get('/', homePageController)

app.get('/about', aboutPageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', createPostController)

app.get('/auth/register', createUserController)

app.get('/auth/login', loginController)

app.post('/posts/store', storePostController)

app.post('/users/register', storeUserController)

app.post('/users/login', loginUserController)

app.listen(4000, () =>{ console.log('App is listening port 4000 now.') })