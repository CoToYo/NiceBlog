/**
 * This file is only for learning the CRUD operations on a test database.
 */

const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/test-blog')

Post.find({
    // title: 'My first blog post'
    description: 'Blog post description.'
}).then((error, post) => {
    console.log(error, post)
})

Post.findById("6404dc8fa76b08be007a96c2").then((res) => {
    console.log(res)
})



// create a new document in the 'Post' collection
// Post.create({
    
//     title: 'My first blog post',

//     description: 'Blog post description.',

//     content: 'Lorem ipsum content'

// }).then((error, post) => {
//     console.log(error, post)
// })

/**
 * !!! callback function is no longer accepts by Mongoose now!
 * Post.create({
 *  xxx : 'xxxxx'
 *  ...
 * }, (error, post) => { console.log(error, post)})
 */
