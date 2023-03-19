const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    
    // find all posts.
    const posts = await Post.find({})

    console.log(req.session)

    // when it's rendering the view 'index', we are gonna have an object of data which contains all of the posts on the database.
    res.render('index', {
        // pass the post as parameter into the rendered view
        posts: posts
    })
}