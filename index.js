const express = require('express')
const { config, engine } = require('express-edge');
// Configure Edge if need to
// config({ cache: process.env.NODE_ENV === 'production' });
const path = require('path')
const mongoose = require('mongoose')


const app = new express()

// connect to mongodb database 'nice-blog', if this database is not exists, it will automatically creates for us.
mongoose.connect('mongodb://localhost/nice-blog')


// all additional resources (e.g. images, css, js) should be searched in '/public' directory
app.use(express.static('public'))

// Automatically set view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(4000, () =>{
    console.log('App is listening port 4000 now.')
})