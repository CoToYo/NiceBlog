const mongoose = require('mongoose')


// describe all documents in the 'Post' colleciton should look like.
// structre of the documents in the collection
const PostSchema = new mongoose.Schema({
    
    title: String,
    
    description: String,
    
    content: String
})

// the model itself is what is going to communicate with the database
// it represents a collection in database.
const Post = mongoose.model('Post', PostSchema)

/**
 * The module is a variable that represents the current module, 
 * and exports is an object that will be exposed as a module. 
 * So, whatever you assign to module.exports will be exposed as a module.
 * !!! Once an object is exposed as a module, it can be 'required': require('module_name')
 */
module.exports = Post