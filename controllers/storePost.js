const Post = require('../database/models/Post')

const path = require('path') 

const cloudinary = require('cloudinary')

const fs = require('fs')

module.exports = async (req, res) => {
    const { image } = req.files

    const uploadPath = path.resolve(__dirname, '..', 'public/posts_img', image.name)

    // image.mv(target_path), it moves image to tartget_path
    await image.mv(uploadPath)

    try{
        const result = await cloudinary.v2.uploader.upload(uploadPath)

        // storage data
        await Post.create({
            ...req.body,
            
            image: result.secure_url,

            // bind the user with this post
            author: req.session.userId

        })

        // fs.unlinkSync(uploadPath)
        res.redirect('/')

    } catch(error){
        console.log(`ERROR: ${error}`)
        return res.redirect('/')
    }
    
}