const Post = require("../database/models/Post")

module.exports = async(req, res) => {
    // pinrtout post id
    // console.log(`post id: ${req.params.id}`)
    console.log(`post id: ${JSON.stringify(req.params)}`)

    try{
        const post = await Post.findById(req.params.id)

        res.render('post', {
            // pass the post as parameter into the rendered view
            post: post
        })
    } catch(error){
        console.log(error)
        return res.redirect('/')
    }
}