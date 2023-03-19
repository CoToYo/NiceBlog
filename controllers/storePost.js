const Post = require('../database/models/Post')

const path = require('path') 

const cloudinary = require('cloudinary')

module.exports = async (req, res) => {
    const { image } = req.files

    console.log(image)

    const uploadPath = path.resolve(__dirname, '..', 'public/posts_img', image.name)

    // image.mv(target_path), it moves image to tartget_path
    await image.mv(uploadPath)

    cloudinary.v2.uploader.upload(uploadPath)
        .then((result) => {
            // storage data
            Post.create({
                ...req.body,
                
                image: result.secure_url,

                // bind the user with this post
                author: req.session.userId

            })
            .then((post) => {
                res.redirect('/')
            })
            .catch((error) => { 
                console.log(error)
                return res.redirect('/') 
            })
        })
        .catch((error) => {
            console.log(error)
            return res.redirect('/')
        })

}