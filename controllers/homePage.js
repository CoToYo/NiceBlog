const Post = require('../database/models/Post')

module.exports = async(req, res)=> {
    try{
        // find all posts.
        const posts = await Post.find({}).populate('author')

        // when it's rendering the view 'index', we are gonna have an object of data which contains all of the posts on the database.
        res.render('index', {
            // pass the post as parameter into the rendered view
            posts: posts
        })
    } catch(error) {
        console.log(`ERROR: ${error}`)
    }
}
