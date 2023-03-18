const Post = require('../database/models/Post')

const path = require('path') 

module.exports = async (req, res) => {
    const { image } = req.files

    try{
        // image.mv(target_path), it moves image to tartget_path
        const moveImage = await image.mv(path.resolve(__dirname, '..', 'public/posts_img', image.name))

        console.log(req.body)
        
        // storage data
        Post.create({
            ...req.body,
            
            image: `/posts_img/${image.name}`

        }).then(() => {
            res.redirect('/')
        })
    } catch (error){
        console.log(error)
        res.redirect('/posts/new')
    }
}