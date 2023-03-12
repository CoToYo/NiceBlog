const express = require('express')

const { config, engine } = require('express-edge');

// Configure Edge if need to
// config({ cache: process.env.NODE_ENV === 'production' });
const path = require('path')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const Post = require('./database/models/Post')

const app = new express()


// connect to mongodb database 'nice-blog', if this database is not exists, it will automatically creates for us.
mongoose.connect('mongodb://localhost/nice-blog')

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

app.get('/', async (req, res) => {

    const posts = await Post.find({})

    // when it's rendering the view 'index', we are gonna have an object of data which contains all of the posts on the database.
    res.render('index', {
        // pass the post as parameter into the rendered view
        posts: posts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async (req, res) => {
    console.log(req.params)

    const post = await Post.findById(req.params.id)

    res.render('post', {
        // pass the post as parameter into the rendered view
        post: post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    // req.body would return a parsed JSON data that processed by 'body-parser' package
    
    // storage data
    Post.create(req.body).then((doc) =>{
        res.redirect('/')
    })
    
    console.log(req.body)
})

app.listen(4000, () =>{
    console.log('App is listening port 4000 now.')
})