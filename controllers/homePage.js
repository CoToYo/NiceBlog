const Post = require('../database/models/Post')
const fs = require('fs')
const path = require('path')
const imagePath = path.resolve(__dirname, '..', 'public/posts_img')

module.exports = async(req, res)=> {
    try{
        // clean local storage of image
        fs.readdir(imagePath, (err, files) => {
            for(const file of files){
                fs.unlinkSync(`${imagePath}/${file}`)
            }
        })

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
